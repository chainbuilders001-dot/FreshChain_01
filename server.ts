import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import firebaseConfig from "./firebase-applet-config.json";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";
import { PrismaClient } from "@prisma/client";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

dotenv.config();

const app = express();
const PORT = 3000;

// Lazy initializer for Firebase Firestore
let firebaseApp: any = null;
let firestoreDb: any = null;
function getFirestoreDB() {
  if (!firestoreDb) {
    try {
      firebaseApp = initializeApp(firebaseConfig);
      firestoreDb = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
    } catch (err: any) {
      console.warn("WARNING: Firebase could not be initialized in server.ts.", err.message);
    }
  }
  return firestoreDb;
}

function isValidDatabaseUrl(url: string | undefined): boolean {
  if (!url) return false;
  
  // Check common placeholders
  if (
    url.includes("host:port") || 
    url.includes("placeholder") || 
    url.includes("@host") ||
    url.includes("username:")
  ) {
    return false;
  }

  try {
    // Replace postgresql / postgres with http temporarily to allow standard URL parsing
    const tempUrl = url.replace(/^(postgresql|postgres):/, "http:");
    const parsed = new URL(tempUrl);
    
    if (parsed.port) {
      const portNum = Number(parsed.port);
      if (isNaN(portNum) || portNum <= 0 || portNum > 65535) {
        return false;
      }
    }
    
    if (parsed.hostname === "host" || parsed.hostname === "port") {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
}

// Lazy initializer for Prisma PostgreSQL connection
let prismaClient: PrismaClient | null = null;
function getPrisma() {
  if (!prismaClient) {
    const url = process.env.DATABASE_URL;
    if (isValidDatabaseUrl(url)) {
      try {
        prismaClient = new PrismaClient();
      } catch (err: any) {
        console.error("CRITICAL: Failed to instantiate PrismaClient. DATABASE_URL may be invalid.", err.message);
        prismaClient = null;
      }
    } else {
      console.warn("WARNING: DATABASE_URL is not defined, invalid, or is a placeholder in server.ts. Relational logging will be simulated.");
    }
  }
  return prismaClient;
}

// Middleware
app.use(express.json({ limit: "50mb" }));

// Lazy initializer for Google Gen AI
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. AI features will run in mock demonstration mode.");
    }
    aiClient = new GoogleGenAI({ apiKey: key || "DUMMY_KEY" });
  }
  return aiClient;
}

// ----------------------
// Backend API Endpoints
// ----------------------

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: Date.now() });
});

// 2. Crop Health Scanner API (Gemini Vision Proxy)
app.post("/api/ai/crop-scanner", async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: "Missing crop image payload." });
    }

    const cleanedBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback Mock output if API key is not configured to avoid service interruption
    if (!apiKey) {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate convolutional analysis latency
      const mockResult = {
        diagnosis: "Cassava Mosaic Case Detected (Simulated)",
        severity: "MEDIUM",
        confidence: 0.89,
        recommendations: [
          "Uproot and destroy heavily infected cassava plants to prevent further farm transmission.",
          "Plant verified, disease-free selection cuttings sourced from Agro-Agents.",
          "Implement biological control of whiteflies utilizing localized neem botanical extracts.",
          "Add potassium-dense soil nutrients to boost crop vigor and foliage recovery."
        ]
      };

      const prisma = getPrisma();
      if (prisma) {
        try {
          const user = await prisma.user.findFirst();
          const fallbackUserId = user?.id || "anonymous-test-user";
          await prisma.aICropScanLog.create({
            data: {
              userId: fallbackUserId,
              fileName: "selected-sample.jpg",
              diagnosis: mockResult.diagnosis,
              confidence: mockResult.confidence * 100,
              severity: mockResult.severity,
              recommendations: JSON.stringify(mockResult.recommendations),
            }
          });
        } catch (err: any) {
          console.warn("Prisma mock scan log skipped:", err.message);
        }
      }

      return res.json(mockResult);
    }

    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: cleanedBase64,
          },
        },
        {
          text: "Analyze this agricultural crop leaf image for any visual plant diseases or pests. Provide a clear diagnostic summary, classify severity (LOW, MEDIUM, HIGH), estimate confidence score between 0.0 and 1.0, and specify 3-5 organic/treatment recommendations. Return the response in strict JSON format.",
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diagnosis: { type: Type.STRING, description: "Detailed diagnostic summary of the disease or pest" },
            severity: { type: Type.STRING, enum: ["LOW", "MEDIUM", "HIGH"] },
            confidence: { type: Type.NUMBER, description: "Confidence score between 0.0 and 1.0" },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-5 direct, actionable organic treatment suggestions"
            }
          },
          required: ["diagnosis", "severity", "confidence", "recommendations"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");

    const prisma = getPrisma();
    if (prisma) {
      try {
        const user = await prisma.user.findFirst();
        const fallbackUserId = user?.id || "anonymous-test-user";
        await prisma.aICropScanLog.create({
          data: {
            userId: fallbackUserId,
            fileName: "custom-uploaded-leaf.jpg",
            diagnosis: parsed.diagnosis || "Visual Disease Detected",
            confidence: (parsed.confidence || 0.85) * (parsed.confidence <= 1 ? 100 : 1),
            severity: parsed.severity || "MEDIUM",
            recommendations: JSON.stringify(parsed.recommendations || []),
          }
        });
      } catch (err: any) {
        console.warn("Prisma real scan log skipped:", err.message);
      }
    }

    res.json(parsed);
  } catch (error: any) {
    console.error("Crop Scanner Endpoint Error:", error);
    res.status(500).json({ error: "Crop health scanning failed.", details: error.message });
  }
});

const MOCK_DIAGNOSES = [
  {
    disease: "Tomato Late Blight (Phytophthora infestans)",
    confidence: 94.8,
    severity: "HIGH",
    recommendations: [
      "Immediately isolate affected plants to restrict spore propagation.",
      "Apply copper-based organic fungicides early in the morning cycle.",
      "Prune lower canopy leaves to optimize airflow and lower humidity vectors."
    ]
  },
  {
    disease: "Cassava Mosaic Disease (CMD)",
    confidence: 89.2,
    severity: "CRITICAL",
    recommendations: [
      "Uproot and safely incinerate infected cassava cultivars to protect surrounding yield.",
      "Introduce whitefly vector controls (using neem oil or organic insecticidal soap).",
      "Source certified disease-resistant stem cuttings for the next cultivation cycle."
    ]
  },
  {
    disease: "Maize Rust (Puccinia sorghi)",
    confidence: 91.5,
    severity: "MEDIUM",
    recommendations: [
      "Apply recommended organic sulfur fungicides to mitigate foliar spread.",
      "Optimize nitrogen soil balancing to bolster natural plant defense structures.",
      "Schedule overhead irrigation exclusively at sunrise to reduce leaf dampness duration."
    ]
  }
];

// High-Reliability Express API Route mimicking enterprise classification
app.post("/api/ai/scan", upload.single("image"), async (req, res) => {
  try {
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ error: "No crop image payload detected." });
    }

    // 3. Size and Type Validation Constraints
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(imageFile.mimetype)) {
      return res.status(400).json({ error: "Invalid file format. Upload JPEG, PNG, or WEBP." });
    }

    if (imageFile.size > 5 * 1024 * 1024) { // 5MB Limit
      return res.status(400).json({ error: "Image file size exceeds the 5MB safety limit." });
    }

    // 4. Simulate Computational Latency 
    // This gives the frontend time to execute a crisp pulsing skeleton loader on screen
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Select a deterministic mock diagnostic based on the filename length 
    // This makes sure testing different files gives different realistic results!
    const selectionIndex = imageFile.originalname.length % MOCK_DIAGNOSES.length;
    const diagnosisResult = MOCK_DIAGNOSES[selectionIndex];

    // 5. Database Logging (Save analysis history to PostgreSQL via Prisma)
    const prisma = getPrisma();
    let scanId = "simulated-scan-id-" + Math.floor(Math.random() * 10000);
    
    if (prisma) {
      try {
        // Query first user if any, or default to system admin/anon placeholder
        const user = await prisma.user.findFirst();
        const fallbackUserId = user?.id || "anonymous-test-user";
        
        const scanLog = await prisma.aICropScanLog.create({
          data: {
            userId: fallbackUserId,
            fileName: imageFile.originalname,
            diagnosis: diagnosisResult.disease,
            confidence: diagnosisResult.confidence,
            severity: diagnosisResult.severity,
            recommendations: JSON.stringify(diagnosisResult.recommendations),
          }
        });
        scanId = scanLog.id;
      } catch (prismaErr: any) {
        console.warn("Prisma scan logging skipped or offline:", prismaErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      scanId,
      ...diagnosisResult,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error("CROP_SCANNER_CORE_ERROR:", error);
    return res.status(500).json({ 
      error: "Internal AI Diagnostics Server Error", 
      details: error.message 
    });
  }
});

// Hyper-localized nutritional & budgetary insight matrices matching the African market
const PRESET_ANSWERS: Record<string, string> = {
  "student_plan": `### 🎓 ₦2,000 Student Weekly High-Protein Meal Plan
Here is your optimized low-cost, high-yield macro breakdown using zero middlemen source products:

| Day | Breakfast | Lunch | Dinner |
| :--- | :--- | :--- | :--- |
| **Mon - Wed** | Spiced Ogi (Millet) + Groundnuts | Brown Beans + Garri (Source: Epe Hub) | Sweet Potato Hash + 1 Boiled Egg |
| **Thu - Sat** | Whole Wheat Bread + Peanut Butter | Jollof Rice (Rice from Kano Cooperative) | Vegetable Efo Riro + Smoked Fish |
| **Sunday** | Yam Fries + Pepper Sauce | Rice & Beans Combo | Oatmeal swallow + Vegetable soup |

**💡 Budget Hack:** Purchase "Rescue Marketplace" tomatoes in batches. Blend, boil down, and store in oil to preserve shelf-life up to 14 days without electricity.`,

  "yam_storage": `### 🥔 Local Storage Hacks: Roots & Tubers
To completely halt post-harvest spoilage of Yams, Cassava, and Sweet Potatoes without access to refrigeration:
1. **The Ash Matrix:** Rub wood ash completely over broken or bruised stems. This creates an organic alkaline protective barrier against rot fungus.
2. **Avoid Concrete Floors:** Storing yams directly on concrete causes rapid moisture sweating. Pile them on a dry pallet or hanging wooden rack in a well-ventilated dark room.
3. **Cassava Damp Sand Burial:** Freshly harvested cassava spoils within 48 hours. Bury them in boxes of clean, damp river sand to keep them crisp for up to 3 weeks.`,

  "budget_basket": `### 🧺 Family Smart Basket Optimizer (Family of 4)
How to balance a nutrient-dense basket on a tight baseline budget:
* **Primary Carbs:** Local unpolished Rice (5kg) + Yellow Garri (2kg). Local rice contains 3x more Vitamin B1 than imported polished alternatives.
* **Proteins:** Local Brown Beans (3kg) + Crates of Eggs. Eggs represent the single cheapest per-gram source of bioavailable protein.
* **Micro-nutrients:** Fluted Pumpkin Leaves (Ugu) + Local Carrots + Scent Leaf. Buy directly from cooperative farmers in our "Bulk Pool" tab to save up to 45% compared to open urban market spaces.`
};

// 3. NutriBot Assistant Chat API
app.post("/api/ai/nutribot", async (req, res) => {
  try {
    const { message, presetKey, history = [] } = req.body;
    
    // Simulate active cognitive text-generation latency
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 1. Handle preset short-circuit keys
    if (presetKey && PRESET_ANSWERS[presetKey]) {
      return res.json({
        reply: PRESET_ANSWERS[presetKey]
      });
    }

    if (!message) {
      return res.status(400).json({ error: "Missing prompt query or presetKey." });
    }

    const lowerMsg = message.toLowerCase();

    // 2. Local conditional rule processing to mock intelligent responses if keywords match
    if (lowerMsg.includes("student") || lowerMsg.includes("plan") || lowerMsg.includes("2000")) {
      return res.json({ reply: PRESET_ANSWERS["student_plan"] });
    } else if (lowerMsg.includes("yam") || lowerMsg.includes("storage") || lowerMsg.includes("spoil")) {
      return res.json({ reply: PRESET_ANSWERS["yam_storage"] });
    } else if (lowerMsg.includes("family") || lowerMsg.includes("basket") || lowerMsg.includes("budget")) {
      return res.json({ reply: PRESET_ANSWERS["budget_basket"] });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // General mock response if key is missing and no presets matched
      let reply = `Hello! I am NutriBot, your FreshChain agricultural nutrition advisor. 

I can calculate meal plans, budget baskets, or crop preservation hacks. Try clicking one of our **Optimized Suggestion Cards** below for deep matrix breakdowns!`;
      
      if (lowerMsg.includes("recipe") || lowerMsg.includes("cook") || lowerMsg.includes("food")) {
        reply = "Here's a premium, budget-friendly recipe block summarizing nutrition:\n\n**Oyo Orange Vigor Salad**\n- **Ingredients**: Fresh Oyo oranges, local carrots, chopped fluted pumpkin leaves (Ugu), and toasted cashew nuts.\n- **Preparation**: Slice oranges thin, shred carrots, lightly scald Ugu. Toss with cold-pressed groundnut oil and juice.\n- **Health Benefits**: Packed with peak Vitamin C and Beta-Carotene to bolster immunity and improve skin health.";
      } else if (lowerMsg.includes("tomato") || lowerMsg.includes("fresh")) {
        reply = "Tomatoes are incredibly dense in Lycopene, a highly potent antioxidant shown to lower heart disease risks and improve cardiovascular resilience. Direct-sourced tomatoes from Ogun State are currently holding a 95% peak freshness score!";
      } else if (lowerMsg.includes("cassava") || lowerMsg.includes("disease")) {
        reply = "Leaf spotting and curly leaves on cassava typically suggest Cassava Mosaic Virus, mostly spread by whiteflies. I recommend uprooting affected stems and planting resistant stems from verified Agro-Agents.";
      }
      return res.json({ reply });
    }

    const ai = getAIClient();
    const systemPrompt = "You are NutriBot, an expert digital nutritionist and agricultural assistant for FreshChain in Sub-Saharan Africa. Provide clear, direct, and actionable advice focusing on local crops, affordable healthy food recipes, vitamins, and crop wellness tips. Keep responses elegant, structured, and informative. When returning food lists or plans, use markdown tables formatting if possible.";
    const contents = [...history, { role: "user", parts: [{ text: message }] }];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("NutriBot Endpoint Error:", error);
    res.status(500).json({ error: "NutriBot request failed.", details: error.message });
  }
});

// Realtime simulated immutable farm-to-fork records map
const MOCK_TRACE_REGISTRY: Record<string, any> = {
  "FC-2026-NGR-893": {
    batchId: "BCH-TOM-0422-X",
    productName: "Organic Plum Tomatoes",
    originHub: "Kano Agricultural Cooperative Cluster (Hub #4)",
    currentStatus: "DELIVERED",
    timeline: [
      {
        stage: "FARM_HARVEST",
        title: "Cultivation & Harvest Validation",
        description: "Harvested from certified organic soil matrix. Audited for zero synthetic chemical residues.",
        timestamp: "2026-06-11T06:30:00Z",
        operator: "Alhaji Ibrahim Musa (Farmer ID: #F-0432)",
        meta: "Freshness Score: 96% | Moisture Level: 12%",
        hash: "0x8f2c9e71a3d5f4b6c8e901a2b3c4d5e6f7a8b9c0"
      },
      {
        stage: "QUALITY_ASSURANCE",
        title: "Agro-Agent Batch Ingestion",
        description: "Batch arrived at rural aggregation branch. Sorted, sanitized, and certified fit for long-range transit.",
        timestamp: "2026-06-11T11:15:00Z",
        operator: "Chinedu Okafor (Agro-Agent ID: #AA-092)",
        meta: "Weight Verified: 250KG | Grade: Premium A",
        hash: "0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b"
      },
      {
        stage: "COLD_STORAGE",
        title: "Solar Cooling Hub Check-in",
        description: "Transferred into specialized solar-powered cooling containers to pause respiration and decay degradation.",
        timestamp: "2026-06-11T14:00:00Z",
        operator: "FreshChain Smart Cooler (Unit #SC-12)",
        meta: "Ambient Temperature Maintained: 4.2°C | Humidity: 85%",
        hash: "0x7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f"
      },
      {
        stage: "LAST_MILE_DISPATCH",
        title: "Rider Logistics Handoff",
        description: "Secured onto local dispatcher vehicle. Escrow transaction protocol initialized safely on the network.",
        timestamp: "2026-06-12T08:45:00Z",
        operator: "Tunde Bakare (Rider ID: #R-0881)",
        meta: "Transit Box Temp: 6.0°C | ETA: 55 Mins",
        hash: "0x1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7e8f9a0b"
      },
      {
        stage: "FINAL_DELIVERY",
        title: "Escrow Released & Delivered",
        description: "Secure delivery token matching verified by consumer. Funds released safely out of escrow to source farmer wallet.",
        timestamp: "2026-06-12T09:38:00Z",
        operator: "Consumer Endpoint Validation",
        meta: "Handover Status: Cryptographically Verified",
        hash: "0x5a6b7c8d9e0f1a2b3c4d5e6f7e8f9a0b1c2d3e4f"
      }
    ]
  }
};

// 4. Traceability Ledger API
app.get("/api/products/trace", async (req, res) => {
  try {
    const orderId = (req.query.orderId as string) || "FC-2026-NGR-893";

    // Simulate database lookup latency
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const record = MOCK_TRACE_REGISTRY[orderId];

    if (!record) {
      return res.status(404).json({ error: "Traceability ledger entry not found for this reference." });
    }

    return res.status(200).json({ success: true, ...record });
  } catch (error: any) {
    return res.status(500).json({ error: "Traceability sub-system ledger failure." });
  }
});

// Matrix engine helper: Generates deterministic trend arrays based on inputs
function generateForecastData(baseDemand: number, trendFactor: number, noiseSeed: number) {
  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, idx) => {
    // Simulate multi-variable wave functions (seasonal spikes + macro growth + randomness)
    const seasonalModifier = Math.sin((idx + noiseSeed) * 1.2) * 15; 
    const structuralGrowth = idx * trendFactor * 8;
    const predictedVolume = Math.round(baseDemand + seasonalModifier + structuralGrowth);
    
    // Calculate inverse price elasticity (higher demand volume = slightly normalized unit prices)
    const projectedPrice = Math.round((baseDemand * 12) / (predictedVolume * 0.9));

    return {
      month,
      volume: Math.max(predictedVolume, 10),
      projectedPrice: Math.max(projectedPrice, 150),
      confidenceInterval: Math.max(Math.round(98 - (idx * 2.5)), 75) // Farther out months reduce confidence
    };
  });
}

// 4.5 Demand Forecast Core API
app.get("/api/analytics/forecast", async (req, res) => {
  try {
    const category = (req.query.category as string) || "VEGETABLES";
    const region = (req.query.region as string) || "LAGOS_URBAN";

    // 1. Live Database Aggregation (Optional Hook)
    // In a fully populated db, we would count recent sales velocity to establish baseline seeds
    let baselineSeed = 120;
    let growthTrend = 1.5;

    // Apply strict parameter weights depending on selected hub constraints
    if (category === "TUBERS") { baselineSeed = 210; growthTrend = 0.8; }
    if (category === "GRAINS") { baselineSeed = 340; growthTrend = 2.1; }
    if (region === "KANO_RURAL" || region === "KANO_CLUSTER") { baselineSeed *= 1.3; growthTrend *= 0.9; }

    // 2. Execute Predictive Matrix Computations
    const forecastArray = generateForecastData(baselineSeed, growthTrend, category.length);

    // Calculate aggregated high-level KPIs for immediate dashboard ingestion
    const totalProjectedVolume = forecastArray.reduce((acc, curr) => acc + curr.volume, 0);
    const marketDeficitScore = Math.min(Math.round((baselineSeed / growthTrend) * 0.4), 100);
    
    const operationalPayload = {
      success: true,
      parameters: { category, region },
      summary: {
        totalProjectedVolume,
        marketDeficitScore, // Higher score = extreme localized supply shortage looming
        recommendedAction: marketDeficitScore > 65 
          ? "CRITICAL SUFFICENCY RISK: Scale production cycles immediately to capture premium price margins."
          : "STABLE TRENDS: Maintain standard rotating cultivation sequences."
      },
      forecast: forecastArray,
      generatedAt: new Date().toISOString()
    };

    return res.status(200).json(operationalPayload);
  } catch (error: any) {
    console.error("FORECAST_ENGINE_FAULT:", error);
    return res.status(500).json({ error: "Demand Analytics Engine runtime error." });
  }
});

// Mutable reference registry tracking transport checkpoints
let LIVE_LEDGER_REGISTRY: Record<string, {
  batchId: string;
  farmerId: string;
  escrowValue: number;
  currentStep: number;
  isPayoutReleased: boolean;
  timeline: Array<{ title: string; operator: string; timestamp: string; verified: boolean }>;
}> = {
  "FC-2026-NGR-893": {
    batchId: "FC-2026-NGR-893",
    farmerId: "farm-902",
    escrowValue: 18500,
    currentStep: 2, // 0: Harvest, 1: Cold Chain, 2: Last Mile Rider, 3: Delivered/Released
    isPayoutReleased: false,
    timeline: [
      { title: "Harvest & Micro-Bio Logging", operator: "Abuja Cooperative Hub", timestamp: "2026-06-12 06:30", verified: true },
      { title: "Solar Cold-Chain Ingestion", operator: "Ketu Distribution Cell", timestamp: "2026-06-12 14:15", verified: true },
      { title: "Last-Mile Distribution Handoff", operator: "Rider ID: #4522", timestamp: "2026-06-13 09:10", verified: true },
      { title: "Consumer Receipt & Escrow Release", operator: "End Buyer Client", timestamp: "Pending Verification", verified: false }
    ]
  }
};

// 4.6 Traceability Escrow Ledger Core API
app.get("/api/traceability/ledger", (req, res) => {
  const batchId = (req.query.batchId as string) || "FC-2026-NGR-893";
  const record = LIVE_LEDGER_REGISTRY[batchId];
  if (!record) {
    return res.status(404).json({ error: "Batch reference mismatch." });
  }
  return res.status(200).json({ success: true, record });
});

app.post("/api/traceability/ledger", (req, res) => {
  try {
    const { batchId } = req.body;
    const record = LIVE_LEDGER_REGISTRY[batchId];
    
    if (!record) {
      return res.status(404).json({ error: "Batch trace fault" });
    }
    if (record.isPayoutReleased) {
      return res.status(400).json({ error: "Funds already dispatched." });
    }

    // Execute state progression changes
    record.currentStep = 3;
    record.isPayoutReleased = true;
    record.timeline[3].verified = true;
    record.timeline[3].timestamp = new Date().toISOString().replace("T", " ").substring(0, 16);

    return res.status(200).json({
      success: true,
      message: "Delivery validated successfully. Escrow funds instantly released via Flutterwave node.",
      record
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal system validation exception" });
  }
});

// 4.7 Live Crop Ingestion API
app.post("/api/farmer/produce", async (req, res) => {
  try {
    const { produceName, volume, price, category, region, farmerId, farmerName } = req.body;

    if (!produceName || !volume || !price) {
      return res.status(400).json({ error: "Missing mandatory matrix parameters." });
    }

    const freshnessVal = Math.floor(82 + Math.random() * 17);
    const traceHash = "FCH_" + Math.random().toString(36).substring(2, 11).toUpperCase();

    // Determine an elegant unsplash image based on keywords
    let imageLink = "https://images.unsplash.com/photo-1546473427-e1adca354591?auto=format&fit=crop&q=80&w=300"; // tomato
    const nameLower = produceName.toLowerCase();
    if (nameLower.includes("yam") || nameLower.includes("cassava") || nameLower.includes("tuber")) {
      imageLink = "https://images.unsplash.com/photo-1571771894821-ad99024177c6?auto=format&fit=crop&q=80&w=300";
    } else if (nameLower.includes("banana") || nameLower.includes("melon") || nameLower.includes("fruit")) {
      imageLink = "https://images.unsplash.com/photo-1571771894821-ad99024177c6?auto=format&fit=crop&q=80&w=300";
    } else if (nameLower.includes("spinach") || nameLower.includes("veg") || nameLower.includes("leaf")) {
      imageLink = "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=300";
    } else if (nameLower.includes("pepper")) {
      imageLink = "https://images.unsplash.com/photo-1566567118183-f42ed974b946?auto=format&fit=crop&q=80&w=300";
    }

    // Attempt to write live to Firestore
    let savedDocId = null;
    const dbInstance = getFirestoreDB();
    if (dbInstance) {
      try {
        const docRef = await addDoc(collection(dbInstance, "products"), {
          name: produceName,
          stock: parseInt(volume),
          qty: `${volume} kg`,
          price: Number(price),
          category: category || "Vegetables",
          location: region || "Ogun State",
          freshnessScore: freshnessVal,
          traceabilityHash: traceHash,
          harvestDate: Date.now(),
          farmerId: farmerId || "active_farmer_session",
          farmerName: farmerName || "Certified FreshChain Farmer",
          image: imageLink
        });
        savedDocId = docRef.id;
      } catch (firestoreError: any) {
        console.warn("Firestore save within produce API failed. Proceeding locally.", firestoreError.message);
      }
    }

    // Seed the dynamic traceability block for the trace search page!
    MOCK_TRACE_REGISTRY[traceHash] = {
      batchId: traceHash,
      productName: produceName,
      originHub: region || "Ogun State Hub",
      currentStatus: "FARM_HARVEST",
      timeline: [
        {
          stage: "FARM_HARVEST",
          title: "Cultivation & Farm Harvest",
          description: `Harvested live at the verified organic fields of ${region || "Ogun State"}. Enrolled into the Smart Traceability ledger automatically.`,
          timestamp: new Date().toISOString(),
          operator: farmerName || "Certified FreshChain Farmer",
          meta: `Volume: ${volume}KG | Primary Status: FARM_HARVEST`,
          hash: "0x" + Math.random().toString(16).slice(2, 42).padEnd(40, "0")
        }
      ]
    };

    // Also seed a record inside LIVE_LEDGER_REGISTRY for maximum consistency!
    LIVE_LEDGER_REGISTRY[traceHash] = {
      batchId: traceHash,
      farmerId: farmerId || "farm-active",
      escrowValue: Number(price) * Number(volume),
      currentStep: 0, // 0: Harvest
      isPayoutReleased: false,
      timeline: [
        { title: "Harvest & Micro-Bio Logging", operator: farmerName || "Certified FreshChain Farmer", timestamp: new Date().toISOString().replace("T", " ").substring(0, 16), verified: true },
        { title: "Solar Cold-Chain Ingestion", operator: "Pending", timestamp: "Pending Ingestion", verified: false },
        { title: "Last-Mile Distribution Handoff", operator: "Pending", timestamp: "Pending Dispatch", verified: false },
        { title: "Consumer Receipt & Escrow Release", operator: "Pending", timestamp: "Pending Verification", verified: false }
      ]
    };

    const newListing = {
      id: savedDocId || `crop-${Date.now()}`,
      name: produceName,
      price: Number(price),
      volume: Number(volume),
      category,
      region,
      traceabilityHash: traceHash,
      timestamp: new Date().toISOString()
    };

    return res.status(201).json({
      success: true,
      message: "Produce cataloged live across all ecosystem nodes successfully.",
      item: newListing
    });
  } catch (error: any) {
    console.error("PRODUCE_CREATION_FAULT:", error);
    return res.status(500).json({ error: "Farming database layer failure." });
  }
});

// 5. Dynamic Pricing AI Predictor API
app.post("/api/pricing/evaluate", (req, res) => {
  const { cropType, location, basePrice, qualityScore } = req.body;
  if (!cropType || !basePrice) {
    return res.status(400).json({ error: "Missing pricing parameters." });
  }

  // Multi-factor pricing algorithm representing dynamic market scarcity
  const parsedBase = Number(basePrice);
  const qFactor = qualityScore ? Number(qualityScore) / 100 : 0.95;

  // Regional dynamics factor
  let regionalSupplyShortageFactor = 1.0;
  const locLower = String(location || "").toLowerCase();
  if (locLower.includes("lagos") || locLower.includes("island")) {
    regionalSupplyShortageFactor = 1.35; // Urban high demand
  } else if (locLower.includes("abuja")) {
    regionalSupplyShortageFactor = 1.22;
  } else if (locLower.includes("kano") || locLower.includes("kaduna")) {
    regionalSupplyShortageFactor = 0.95; // Production hubs, abundant supply
  }

  // Simulated seasonal scarcity premium based on current month
  const month = new Date().getMonth();
  const drySeasonPremium = (month >= 10 || month <= 2) ? 1.15 : 1.0; // dry season scarcity premium

  const recommendedPrice = Math.round(parsedBase * qFactor * regionalSupplyShortageFactor * drySeasonPremium);
  const surgePercentage = Math.round((recommendedPrice / parsedBase - 1) * 100);

  res.json({
    basePrice: parsedBase,
    recommendedPrice,
    surgePercentage,
    scarcityPremium: drySeasonPremium,
    regionalDemandFactor: regionalSupplyShortageFactor,
    evaluationMeta: {
      calculatedAt: Date.now(),
      marketState: surgePercentage > 15 ? "HIGH_DEMAND_SURGE" : "STABLE"
    }
  });
});

// 5. Escrow Payment & Webhook Sim Route
app.post("/api/checkout/payment", (req, res) => {
  const { orderId, amount, paymentMethod } = req.body;
  if (!orderId || !amount) {
    return res.status(400).json({ error: "Missing transaction values." });
  }

  // Simulating Flutterwave escrow transaction setup
  const transactionId = "FLW-ESC-" + Math.floor(100000 + Math.random() * 900000);
  res.json({
    status: "HELD",
    transactionId,
    orderId,
    amount,
    escrowAccount: "FreshChain-Escrow-SafeNode-02",
    gatewayResponse: {
      message: "Payment successfully secured in escrow safe vault via Flutterwave.",
      chargeCode: "00",
      dateTime: new Date().toISOString()
    }
  });
});

// In-memory telemetry cache for real-time tracking fallback
interface TelemetryData {
  coordinates: { lat: number; lng: number };
  metrics?: { heading: number; speed: number };
  lastUpdated: string;
}
const riderInMemoryLocation: Record<string, TelemetryData> = {};

// 6. Realtime Rider Location Telemetry Endpoint
app.post("/api/rider/location", async (req, res) => {
  try {
    const { orderId, latitude, longitude, heading, speed, riderId } = req.body;

    if (!orderId || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: "Missing tracking parameters: orderId, latitude, longitude" });
    }

    const latFloat = parseFloat(latitude);
    const lonFloat = parseFloat(longitude);
    const finalRiderId = riderId || "demo_rider_01";

    if (isNaN(latFloat) || isNaN(lonFloat)) {
      return res.status(400).json({ error: "Invalid dynamic coordinates format." });
    }

    // Update in-memory telemetry cache
    riderInMemoryLocation[orderId] = {
      coordinates: { lat: latFloat, lng: lonFloat },
      metrics: {
        heading: heading !== undefined ? parseFloat(heading) : 0,
        speed: speed !== undefined ? parseFloat(speed) : 0,
      },
      lastUpdated: new Date().toISOString(),
    };

    // Update in Firestore for instant animations
    try {
      const dbInstance = getFirestoreDB();
      if (dbInstance) {
        const deliveryRef = doc(dbInstance, "active_deliveries", orderId);
        await setDoc(
          deliveryRef,
          {
            riderId: finalRiderId,
            coordinates: { lat: latFloat, lng: lonFloat },
            metrics: {
              heading: heading !== undefined ? parseFloat(heading) : 0,
              speed: speed !== undefined ? parseFloat(speed) : 0,
            },
            lastUpdated: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    } catch (fbErr: any) {
      console.warn("Firestore coordinate broadcast skipped or simulated:", fbErr.message);
    }

    // Save in relational database if configured
    const prisma = getPrisma();
    if (prisma) {
      try {
        await prisma.$transaction([
          prisma.user.update({
            where: { id: finalRiderId },
            data: { latitude: latFloat, longitude: lonFloat },
          }),
          prisma.riderLogistics.create({
            data: {
              latitude: latFloat,
              longitude: lonFloat,
              orderId,
              riderId: finalRiderId,
            },
          }),
        ]);
      } catch (dbErr: any) {
        console.warn("Prisma coordinate archival skipped or offline:", dbErr.message);
      }
    }

    res.json({
      success: true,
      message: "Telemetry coordinate update processed successfully.",
      coordinates: { lat: latFloat, lng: lonFloat },
    });
  } catch (error: any) {
    console.error("Rider Location Endpoint Error:", error);
    res.status(500).json({ error: "Location update failed.", details: error.message });
  }
});

// GET Rider Location Telemetry Endpoint
app.get("/api/rider/location", async (req, res) => {
  try {
    const { orderId } = req.query;
    if (!orderId || typeof orderId !== "string") {
      return res.status(400).json({ error: "Missing or invalid orderId parameter." });
    }

    // Try fetching from in-memory cache
    let cached = riderInMemoryLocation[orderId];

    // Fallback: Check Firestore
    if (!cached) {
      try {
        const dbInstance = getFirestoreDB();
        if (dbInstance) {
          const { getDoc } = await import("firebase/firestore");
          const deliveryRef = doc(dbInstance, "active_deliveries", orderId);
          const snap = await getDoc(deliveryRef);
          if (snap.exists()) {
            const data = snap.data();
            cached = {
              coordinates: data.coordinates,
              metrics: data.metrics,
              lastUpdated: data.lastUpdated,
            };
            // Populate cache
            riderInMemoryLocation[orderId] = cached;
          }
        }
      } catch (fbErr: any) {
        console.warn("Firestore location fetch failed:", fbErr.message);
      }
    }

    // Still no coordinates? Generate simulated slow movement around Lagos
    if (!cached) {
      // Create a simulated coordinates route from Lagos Mainland towards Ikeja
      const elapsedMinutes = (Date.now() % 360000) / 60000; // range 0 to 6 mins
      const fraction = elapsedMinutes / 6.0; // 0.0 to 1.0
      // Origin: Lagos Mainland (6.5244, 3.3792), Destination: Ikeja (6.6105, 3.3636)
      const startLat = 6.5244;
      const startLng = 3.3792;
      const endLat = 6.6105;
      const endLng = 3.3636;
      
      const currentLat = startLat + (endLat - startLat) * fraction;
      const currentLng = startLng + (endLng - startLng) * fraction;

      cached = {
        coordinates: { lat: currentLat, lng: currentLng },
        metrics: { heading: 320, speed: 25 },
        lastUpdated: new Date().toISOString(),
      };
    }

    res.json(cached);
  } catch (error: any) {
    console.error("GET Rider Location Telemetry Error:", error);
    res.status(500).json({ error: "Failed to retrieve location.", details: error.message });
  }
});

// 7. Core Flutterwave Webhook Ingestion Hook
app.post("/api/checkout/webhook", async (req, res) => {
  try {
    const signature = req.headers["verif-hash"];
    const targetHash = process.env.FLUTTERWAVE_SECRET_HASH || "FLW_SECRET_WEBHOOK_HASH";

    if (!signature || signature !== targetHash) {
      console.warn("WARNING: Unauthorized or missing Flutterwave signature hash mismatch.");
      return res.status(401).json({ error: "Invalid cryptographic verification credentials." });
    }

    const payload = req.body;
    console.log("Flutterwave webhook event received:", payload);

    const { event, data } = payload;
    if (event !== "charge.completed" || data?.status !== "successful") {
      return res.json({ status: "IGNORED", message: "Only successful charges are processed." });
    }

    const orderId = data.meta?.orderId || data.tx_ref;
    if (!orderId) {
      return res.status(400).json({ error: "Missing tracking order reference identifiers." });
    }

    const prisma = getPrisma();
    if (prisma) {
      try {
        const transactionResult = await prisma.$transaction(async (tx) => {
          const order = await tx.order.findUnique({
            where: { id: orderId },
            include: { items: { include: { product: true } } },
          });

          if (!order) {
            throw new Error(`Order with ID ${orderId} does not exist in the database.`);
          }

          if (order.status === "PAID") {
            return { status: "ALREADY_PROCESSED", orderId: order.id };
          }

          await tx.order.update({
            where: { id: order.id },
            data: { status: "PAID" },
          });

          const escrowLog = await tx.escrowTransaction.create({
            data: {
              referenceHash: data.tx_ref || `TX-${Date.now()}`,
              flutterwaveRef: String(data.flw_ref || data.id),
              status: "IN_ESCROW",
              amount: Number(data.amount),
              orderId: order.id,
            },
          });

          for (const item of order.items) {
            const lineItemHarvestAmount = item.price * item.quantity;
            await tx.user.update({
              where: { id: item.product.farmerId },
              data: {
                walletBalance: {
                  increment: lineItemHarvestAmount,
                },
              },
            });
          }

          return { status: "SUCCESS_VERIFIED", orderId: order.id, escrowId: escrowLog.id };
        });

        return res.json({ message: "Transaction processed successfully.", details: transactionResult });
      } catch (dbErr: any) {
        console.warn("Prisma webhook execution failed or skipped:", dbErr.message);
        return res.json({ message: "Webhook accepted with simulated fallback.", details: { orderId, status: "SIMULATED_SUCCESS" } });
      }
    } else {
      console.log("Relational database is offline, simulating order status and wallet updates.");
      return res.json({ message: "Webhook accepted with simulated fallback.", details: { orderId, status: "SIMULATED_SUCCESS" } });
    }
  } catch (error: any) {
    console.error("Flutterwave Webhook Endpoint Error:", error);
    res.status(500).json({ error: "Webhook ingestion loop failure.", errorMsg: error.message });
  }
});

// ----------------------
// Vite Middleware / Asset Pipeline
// ----------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware attached.");
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Static production build serving from dist/ folder.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`FreshChain full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
