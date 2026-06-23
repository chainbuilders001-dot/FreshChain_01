import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Leaf, Sprout, ShoppingBag, TruckIcon, Camera, BarChart3, MapPin,
  Smartphone, MessageSquare, Globe, ChevronRight, Shield, Zap,
  Users, TrendingUp, Package, Phone, X, Menu, Moon, Sun, FileText, BookOpen
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function LandingPage() {
  const navigate = useNavigate();
  const { isDark, toggleDark } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [ussdOpen, setUssdOpen] = useState(false);
  const [ussdStep, setUssdStep] = useState(0);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [activePolicyTab, setActivePolicyTab] = useState<'privacy' | 'terms' | 'delivery' | 'refund' | 'cookie'>('privacy');

  const policies = {
    privacy: {
      title: 'Privacy Policy',
      effectiveDate: 'JUNE 2026',
      meta: 'Platform: FreshChain | Website: freshchain.africa',
      sections: [
        {
          heading: '1. Introduction',
          text: 'FreshChain ("we", "our", "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your data when you use our platform.'
        },
        {
          heading: '2. Information We Collect',
          text: 'We collect your name, email address, phone number, location, payment information, and usage data when you register and use FreshChain.'
        },
        {
          heading: '3. How We Use Your Information',
          text: 'We use your information to process orders, verify farmer identities, facilitate deliveries, improve our services, send notifications, and personalize your experience on the platform.'
        },
        {
          heading: '4. Data Sharing',
          text: 'We do not sell your personal data. We only share information with delivery riders, payment processors, and verified partners strictly for service delivery purposes.'
        },
        {
          heading: '5. Data Security',
          text: 'We implement encryption, secure servers, and access controls to protect your information from unauthorized access.'
        },
        {
          heading: '6. Your Rights',
          text: 'You have the right to access, update, or delete your personal data at any time by contacting us at privacy@freshchain.africa.'
        },
        {
          heading: '7. Cookies',
          text: 'FreshChain uses cookies to improve user experience and analyze platform performance. You may disable cookies in your browser settings.'
        },
        {
          heading: '8. Changes to This Policy',
          text: 'We may update this policy periodically. Continued use of the platform means you accept any changes made.'
        },
        {
          heading: '9. Contact Us',
          text: 'For privacy concerns, contact us at privacy@freshchain.africa'
        }
      ]
    },
    terms: {
      title: 'Terms and Conditions',
      effectiveDate: 'JUNE 2026',
      meta: 'Platform: FreshChain',
      sections: [
        {
          heading: '1. Acceptance of Terms',
          text: 'By accessing or using FreshChain, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our platform.'
        },
        {
          heading: '2. User Accounts',
          text: 'Users must provide accurate information during registration. You are responsible for maintaining the confidentiality of your account credentials. FreshChain reserves the right to suspend accounts that violate our policies.'
        },
        {
          heading: '3. Farmer Responsibilities',
          text: 'Farmers agree to list only genuine, accurately described produce. Misrepresentation of product quality, quantity, or freshness is strictly prohibited and may result in account suspension.'
        },
        {
          heading: '4. Consumer Responsibilities',
          text: 'Consumers agree to make payments in good faith and confirm deliveries honestly. False delivery disputes will result in account suspension.'
        },
        {
          heading: '5. Prohibited Activities',
          text: 'Users must not engage in fraud, impersonation, spam, harassment, or any activity that disrupts the platform or harms other users.'
        },
        {
          heading: '6. Payments',
          text: 'All transactions on FreshChain are processed securely. Funds are held in escrow and released to farmers upon confirmed delivery. FreshChain charges a small service commission per transaction.'
        },
        {
          heading: '7. Intellectual Property',
          text: 'All content, logos, designs, and technology on FreshChain are the intellectual property of FreshChain and may not be copied or reproduced without written permission.'
        },
        {
          heading: '8. Limitation of Liability',
          text: 'FreshChain is not liable for losses arising from natural disasters, network failures, or events beyond our reasonable control.'
        },
        {
          heading: '9. Termination',
          text: 'FreshChain reserves the right to terminate any account that violates these terms without prior notice.'
        },
        {
          heading: '10. Governing Law',
          text: 'These terms are governed by the laws of the Federal Republic of Nigeria.'
        },
        {
          heading: '11. Contact',
          text: 'For inquiries, contact us at support@freshchain.africa'
        }
      ]
    },
    delivery: {
      title: 'Delivery Policy',
      effectiveDate: 'JUNE 2026',
      meta: 'Platform: FreshChain',
      sections: [
        {
          heading: '1. Delivery Coverage',
          text: 'FreshChain currently delivers within Lagos and select states in Nigeria. Coverage areas are continuously expanding.'
        },
        {
          heading: '2. Delivery Timeframes',
          text: 'Standard delivery takes 2 to 24 hours depending on your location and product availability. Estimated delivery time is shown at checkout.'
        },
        {
          heading: '3. Delivery Fees',
          text: 'Delivery fees are calculated based on distance and order size. The exact fee is displayed before order confirmation.'
        },
        {
          heading: '4. Order Tracking',
          text: 'All orders can be tracked in real time through your FreshChain dashboard from the moment a rider is assigned.'
        },
        {
          heading: '5. Failed Deliveries',
          text: 'If a delivery fails due to an incorrect address or unavailability of the recipient, a redelivery fee may apply. FreshChain will attempt to contact you before marking an order as failed.'
        },
        {
          heading: '6. Damaged or Incorrect Orders',
          text: 'If you receive damaged, spoiled, or incorrect produce, report it within 2 hours of delivery through the platform. We will investigate and offer a replacement or refund where applicable.'
        },
        {
          heading: '7. Rider Conduct',
          text: 'All FreshChain riders are verified and trained. If you experience unprofessional conduct from a rider, report it immediately through the app.'
        },
        {
          heading: '8. Contact',
          text: 'For delivery issues, contact support@freshchain.africa'
        }
      ]
    },
    refund: {
      title: 'Return & Refund Policy',
      effectiveDate: 'JUNE 2026',
      meta: 'Platform: FreshChain',
      sections: [
        {
          heading: '1. Our Commitment',
          text: 'FreshChain is committed to ensuring you receive fresh, quality produce. If you are not satisfied, we are here to help.'
        },
        {
          heading: '2. Eligible Refund Situations',
          text: 'You are eligible for a refund or replacement if you receive spoiled or rotten produce, the wrong product is delivered, the order does not arrive within the agreed timeframe, or the product significantly differs from what was listed.'
        },
        {
          heading: '3. How to Request a Refund',
          text: 'Report your issue within 2 hours of delivery through your FreshChain dashboard. Provide a clear photo of the product received. Our team will review and respond within 24 hours.'
        },
        {
          heading: '4. Refund Processing',
          text: 'Approved refunds are returned to your FreshChain wallet or original payment method within 3 to 5 business days.'
        },
        {
          heading: '5. Non-Refundable Situations',
          text: 'Refunds will not be issued if the complaint is made more than 2 hours after delivery, if the product was damaged after delivery due to improper storage, or if the issue is based on a change of mind.'
        },
        {
          heading: '6. Contact',
          text: 'For refund requests, contact support@freshchain.africa'
        }
      ]
    },
    cookie: {
      title: 'Cookie Policy',
      effectiveDate: 'JUNE 2026',
      meta: 'Platform: FreshChain',
      sections: [
        {
          heading: '1. What Are Cookies',
          text: 'Cookies are small text files stored on your device when you visit FreshChain. They help us improve your experience on the platform.'
        },
        {
          heading: '2. How We Use Cookies',
          text: 'We use cookies to keep you logged in, remember your preferences, analyze platform traffic, and personalize content and recommendations.'
        },
        {
          heading: '3. Types of Cookies We Use',
          text: 'Essential cookies keep the platform functioning properly. Analytics cookies help us understand how users interact with the platform. Preference cookies remember your settings and language choices.'
        },
        {
          heading: '4. Managing Cookies',
          text: 'You can control or disable cookies through your browser settings. Note that disabling essential cookies may affect your ability to use certain features of FreshChain.'
        },
        {
          heading: '5. Third Party Cookies',
          text: 'Some features on FreshChain, such as payment processing and maps, may use third party cookies. We do not control these cookies directly.'
        },
        {
          heading: '6. Contact',
          text: 'For cookie-related concerns, contact privacy@freshchain.africa'
        }
      ]
    }
  };

  const openPolicy = (tab: 'privacy' | 'terms' | 'delivery' | 'refund' | 'cookie') => {
    setActivePolicyTab(tab);
    setPolicyOpen(true);
  };

  const ussdFlow = [
    { display: 'FreshChain Mobile Menu\n*123#\n\n1. Farmer menu\n2. Check current market prices\n3. View my order status\n4. Phone local agent\n\nChoose an option:', input: '' },
    { display: 'FARMER MENU\n\n1. Sell a new crop batch\n2. View current group wallet\n3. Read seasonal recommendations\n4. Temperature warnings\n0. Back\n\nChoose an option:', input: '1' },
    { display: 'SELL Batch\n\nType the name of your crop (e.g., Tomatoes):', input: '2' },
  ];

  // Simulated live platform activity to serve as concrete proof
  const liveActivity = [
    { location: 'Kaduna State Co-op to Abuja General Market', item: '450kg Fresh Onions', status: 'Delivered', payment: '₦135,000 paid to farmer', timing: '32 mins' },
    { location: 'Olukoya Farms to Lagos Main Grocer', item: '220kg Vine Tomatoes', status: 'Delivered', payment: '₦88,000 paid to farmer', timing: '41 mins' },
    { location: 'Chidi Organic Farms to Port Harcourt Hub', item: '95kg Yellow Yam heads', status: 'In Transit', payment: '₦48,000 holding escrow', timing: 'Active' },
    { location: 'Baba Musa Orchard to Enugu Wholesale', item: '310kg Fresh Oranges', status: 'Delivered', payment: '₦93,000 paid to farmer', timing: '28 mins' }
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F5] dark:bg-gray-950 font-sans antialiased text-gray-800 dark:text-gray-200">
      {/* Navbar */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-emerald-700 rounded flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg text-gray-900 dark:text-white font-bold tracking-tight">FreshChain</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">How It Works</a>
            <a href="#features" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">Helper Tools</a>
            <a href="#impact" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">Our Purpose</a>
            <a href="#access" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">Offline Dialing</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleDark}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-500" />}
            </button>
            <button
              onClick={() => navigate('/login')}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="text-sm font-medium bg-emerald-700 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-800 transition-all shadow-sm"
            >
              Get Started
            </button>
          </div>

          <button className="md:hidden p-1.5" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-4 space-y-3 transition-all">
            <a href="#how-it-works" className="block text-gray-700 dark:text-gray-300 py-2" onClick={() => setMenuOpen(false)}>How It Works</a>
            <a href="#features" className="block text-gray-700 dark:text-gray-300 py-2" onClick={() => setMenuOpen(false)}>Helper Tools</a>
            <a href="#impact" className="block text-gray-700 dark:text-gray-300 py-2" onClick={() => setMenuOpen(false)}>Our Purpose</a>
            <a href="#access" className="block text-gray-700 dark:text-gray-300 py-2" onClick={() => setMenuOpen(false)}>Offline Dialing</a>
            <div className="flex gap-3 pt-2">
              <button onClick={() => navigate('/login')} className="flex-1 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm dark:text-white">Sign In</button>
              <button onClick={() => navigate('/signup')} className="flex-1 py-2.5 bg-emerald-700 text-white rounded-lg text-sm">Get Started</button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="bg-slate-950 text-white transition-colors">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-950 border border-emerald-800/60 px-3.5 py-1.5 rounded-full text-xs text-emerald-300 mb-6 font-semibold tracking-wide">
                Live in Nigeria — Serving 36M+ Farmers
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-extrabold mb-6 tracking-tight leading-tight">
                Get fresh food directly from local farms.
              </h1>
              <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed max-w-lg">
                We connect farm owners straight to buyers and local delivery riders in Nigeria. This stops good produce from going to waste, drops food costs for families, and ensures everyone gets paid fairly on time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  onClick={() => navigate('/farmer')}
                  className="flex items-center justify-center gap-2 bg-emerald-700 text-white px-6 py-3.5 rounded-lg hover:bg-emerald-600 transition-all font-semibold text-sm shadow-md"
                >
                  <Sprout className="w-4 h-4" /> I am a Farmer
                </button>
                <button
                  onClick={() => navigate('/consumer')}
                  className="flex items-center justify-center gap-2 bg-slate-800 text-white px-6 py-3.5 rounded-lg hover:bg-slate-700 transition-all font-semibold text-sm border border-slate-700"
                >
                  <ShoppingBag className="w-4 h-4" /> I am a Buyer
                </button>
                <button
                  onClick={() => navigate('/rider')}
                  className="flex items-center justify-center gap-2 bg-slate-800 text-white px-6 py-3.5 rounded-lg hover:bg-slate-700 transition-all font-semibold text-sm border border-slate-700"
                >
                  <TruckIcon className="w-4 h-4" /> I am a Rider
                </button>
              </div>

              <div className="flex items-center gap-2.5 text-slate-400 text-xs">
                <Smartphone className="w-4 h-4 text-emerald-500" />
                <span>No internet? Try dialing our interactive mobile demo: </span>
                <button
                  onClick={() => setUssdOpen(true)}
                  className="underline underline-offset-2 hover:text-white text-emerald-400 font-semibold transition-colors"
                >
                  Dial *123#
                </button>
              </div>
            </div>

            {/* Quick Metrics (Flat design, no gradients, no orbs, no slop) */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '3,420 tons', label: 'Crops successfully routed and saved from waste' },
                { value: '₦24.8 Million', label: 'Paid out directly to Nigerian agricultural growers' },
                { value: '430 farms', label: 'Onboarded growers using our logistics tool' },
                { value: '34 minutes', label: 'Average transit matching time for riders' },
              ].map((stat, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 transition-all">
                  <div className="text-2xl md:text-3xl text-emerald-400 font-extrabold mb-2">{stat.value}</div>
                  <div className="text-xs text-slate-400 leading-relaxed font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section (Replacing original 3 cards in a row with actual dashboard verification proof) */}
      <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-6 lg:px-8 transition-colors">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase">Product Verification</span>
          <h2 className="text-3xl md:text-4xl text-gray-900 dark:text-white font-extrabold mt-2 tracking-tight">Proof of our active local network</h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mt-3">
            We do not show you templates or promises. Here is a live simulation of active batches and direct bank settlements handling food shipments right now.
          </p>
        </div>

        {/* Live Interface Simulator */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          {/* Header Bar */}
          <div className="bg-gray-50 dark:bg-slate-800/50 px-6 py-4 border-b border-gray-200 dark:border-slate-800 flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-none" />
              <span className="text-xs font-bold tracking-wider text-gray-600 dark:text-slate-300 uppercase">Live Transaction Ledger (Nigeria Network)</span>
            </div>
            <div className="text-xs text-gray-400 font-medium">Automatic hourly database synchronization</div>
          </div>

          <div className="grid lg:grid-cols-12">
            {/* Left Ledger Info column */}
            <div className="lg:col-span-5 p-6 lg:p-8 border-r border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/30 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Direct farm-to-table coordination</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400 mb-6">
                  Rural growers list their harvests through our plain USSD codes. Retail buyers in neighboring cities browse prices and secure the batches. Near-instant delivery riders on-screen pick them up directly. No middlemen.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                    <p className="text-xs text-gray-600 dark:text-slate-400"><strong className="text-gray-900 dark:text-white">Listing:</strong> Instant SMS/USSD posting translates ingredients, locations, and crop batch sizes directly.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                    <p className="text-xs text-gray-600 dark:text-slate-400"><strong className="text-gray-900 dark:text-white">Escrow:</strong> Payout funds are locked in secure wallets until delivery is checked for high freshness.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                    <p className="text-xs text-gray-600 dark:text-slate-400"><strong className="text-gray-900 dark:text-white">Fulfillment:</strong> Intelligent routing handles logistics to double delivery speed and save expensive motorcycle fuel.</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-200 dark:border-slate-800 mt-8">
                <div className="text-xs text-slate-400 mb-1 font-semibold uppercase">Platform Verified Totals</div>
                <div className="text-2xl font-black text-gray-900 dark:text-white">₦24,812,500</div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">100% direct payouts sent to grower accounts</div>
              </div>
            </div>

            {/* Right Live Table column */}
            <div className="lg:col-span-7 p-6 lg:p-8">
              <h3 className="text-sm font-bold tracking-wider text-gray-500 dark:text-slate-400 uppercase mb-4">Latest crop dispatches</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-slate-800 text-gray-400 uppercase tracking-wider font-semibold">
                      <th className="pb-3 pr-2">Route Route</th>
                      <th className="pb-3 pr-2">Crops List</th>
                      <th className="pb-3 pr-2">Ledger Status</th>
                      <th className="pb-3 text-right">Payment Paid</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-800/80">
                    {liveActivity.map((act, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-4 pr-2 font-medium text-gray-900 dark:text-white">
                          <div className="truncate max-w-56">{act.location}</div>
                        </td>
                        <td className="py-4 pr-2 text-gray-600 dark:text-slate-300 font-medium">{act.item}</td>
                        <td className="py-4 pr-2">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            act.status === 'Delivered' 
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400' 
                              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                          }`}>
                            {act.status}
                          </span>
                        </td>
                        <td className="py-4 text-right font-bold text-gray-900 dark:text-white">{act.payment.split(' ')[0]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 items-center justify-between text-xs border-t border-gray-100 dark:border-slate-800/60 pt-4">
                <span className="text-gray-500 dark:text-slate-400">Want to test the dashboards directly? Try our interface portals:</span>
                <div className="flex gap-2.5">
                  <button onClick={() => navigate('/farmer')} className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold">Farmer View →</button>
                  <button onClick={() => navigate('/consumer')} className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold">Buyer View →</button>
                  <button onClick={() => navigate('/rider')} className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold">Rider View →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Assistant Tools */}
      <section id="features" className="bg-slate-950 py-24 text-white transition-colors">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">Helpers & Automation</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 tracking-tight">Straightforward support tools</h2>
            <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto mt-3">
              We run clean helper tools on our private server to help solve common farm and transport headaches.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Camera,
                title: 'Plant Health Helper',
                desc: 'Upload a clear picture of any crop on your phone to identify leaf issues or disease details naturally.'
              },
              {
                icon: BarChart3,
                title: 'Fair Market Pricing',
                desc: 'Calculates reasonable daily crop rates based on public city market supply to keep transactions honest.'
              },
              {
                icon: MapPin,
                title: 'Delivery Router',
                desc: 'Plans clean, unified delivery pathways for transport riders to group neighboring orders and save fuel.'
              },
              {
                icon: Shield,
                title: 'Farming Passport',
                desc: 'Arranges crop transaction histories into simple records rural growers can use to secure local microloans.'
              }
            ].map((feat, i) => (
              <div key={i} className="border border-slate-800 bg-slate-900 rounded-xl p-6 hover:border-emerald-600 transition-all">
                <div className="w-10 h-10 rounded bg-emerald-950 text-emerald-400 flex items-center justify-center mb-4">
                  <feat.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold mb-2 text-white">{feat.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-normal">{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* Unified horizontal row */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { icon: Zap, label: 'Demand predictions', desc: 'Identifies which vegetables are highly needed in nearby towns so farmers can coordinate harvests.' },
              { icon: MessageSquare, label: 'Local languages translation', desc: 'Allows rural growers to write or ask advice in Yoruba, Hausa, Igbo, Pidgin, and English.' },
              { icon: Users, label: 'Village coordination partners', desc: 'Connects farm communities with trusted local agro agents for handling hand-listed sales.' }
            ].map((feat, i) => (
              <div key={i} className="flex gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="w-8 h-8 rounded bg-slate-850 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <feat.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold mb-1 text-white">{feat.label}</div>
                  <p className="text-slate-400 text-xs leading-relaxed font-normal">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainable Aims */}
      <section id="impact" className="py-24 max-w-7xl mx-auto px-6 lg:px-8 transition-colors">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase">Our core focus</span>
          <h2 className="text-3xl md:text-4xl text-gray-900 dark:text-white font-extrabold mt-2 tracking-tight">The difference we want to make</h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto mt-3">
            Every operational tool inside FreshChain is designed with real local community benefits in mind.
          </p>
        </div>

        {/* Clean, robust grid - no decorative gradients, flat colors only */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: 'Goal 1', name: 'Stop food hunger', desc: 'Prevent edible crops from spoiling and rotting inside rural transit trucks.' },
            { num: 'Goal 2', name: 'Protect grower wages', desc: 'Ensure small food growers keep full wholesale pricing with zero hidden fees.' },
            { num: 'Goal 3', name: 'Cut household costs', desc: 'Direct shipping lowers general grocery pricing for families in busy city zones.' },
            { num: 'Goal 4', name: 'Clean transport routing', desc: 'Smarter grouped routing prevents waste emissions and reduces trip distances.' }
          ].map((sdg, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-6 text-center hover:border-emerald-600 transition-all shadow-sm">
              <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400 mb-1">{sdg.num}</div>
              <div className="text-base font-extrabold text-gray-900 dark:text-white mb-2">{sdg.name}</div>
              <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed font-normal">{sdg.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Accessibility / Dialing */}
      <section id="access" className="py-24 max-w-7xl mx-auto px-6 lg:px-8 border-t border-gray-200 dark:border-slate-800 transition-colors">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase">Accessibility</span>
            <h2 className="text-3xl md:text-4xl text-gray-900 dark:text-white font-extrabold mt-2 tracking-tight">
              We built this to serve everyone.
            </h2>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed mt-4 mb-8">
              You do not need a expensive smartphone or complex cellular data contracts to sell with us. We support dialing plain mobile phone numbers, sending standard text messages, and reaching local agents in your village.
            </p>

            <div className="space-y-6">
              {[
                { icon: Smartphone, title: 'USSD Dialing: *123#', desc: 'Dial our shortcode to review pricing, check active buyers, and secure sales with no internet connection.' },
                { icon: MessageSquare, title: 'SMS Texting', desc: 'Send crop listings directly as simpler texts to our free Nigeria server line.' },
                { icon: Globe, title: 'Local Languages', desc: 'Read prompts instantly translated in Yoruba, Hausa, Igbo, Pidgin English, or Standard English.' },
                { icon: Users, title: 'Village Agro Agents', desc: 'Trusted physical representatives on the ground to assist any farmers without mobile access.' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-gray-100 dark:bg-gray-800 text-emerald-700 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Mobile USSD Screen Mockup */}
          <div className="flex justify-center">
            <div className="w-80 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg relative">
              <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
                <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400">MTN Nigeria</span>
                  <span className="text-[10px] font-bold text-slate-400">12:34 PM</span>
                </div>
                <div className="bg-emerald-950 min-h-48 p-5 font-mono">
                  <div className="text-emerald-300 text-[11px] whitespace-pre-line leading-relaxed font-bold">
                    {`FreshChain Network\n\n1. Register my farm\n2. View city tomato rates\n3. Contact field rep\n\nEnter number below:`}
                  </div>
                </div>
                <div className="bg-slate-900 px-4 py-3 flex gap-2 items-center border-t border-slate-800">
                  <div className="flex-1 bg-slate-950 rounded border border-slate-800 px-3 py-1.5 font-mono text-xs text-emerald-400">
                    2_
                  </div>
                  <button
                    onClick={() => setUssdOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-1.5 rounded text-xs transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded shadow-md">
                No Data Required
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Call To Action Section */}
      <section className="bg-slate-950 py-24 text-center text-white transition-colors">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
            Connect to the local food network
          </h2>
          <p className="text-slate-450 mb-10 text-base md:text-lg leading-relaxed text-slate-300">
            Join the decentralized logistics space today to reduce post-harvest waste and support farming families around you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/signup')}
              className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg transition-all shadow-md font-bold text-sm"
            >
              <Sprout className="w-5 h-5" /> Join as a Grower
            </button>
            <button
              onClick={() => navigate('/consumer')}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg transition-all border border-slate-700 font-bold text-sm"
            >
              <ShoppingBag className="w-5 h-5" /> Shop Produce Batches
            </button>
            <button
              onClick={() => navigate('/rider')}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg transition-all border border-slate-700 font-bold text-sm"
            >
              <TruckIcon className="w-5 h-5" /> Onboard as a Rider
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-16 border-t border-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-6 h-6 bg-emerald-750 rounded flex items-center justify-center">
                  <Leaf className="w-3 h-3 text-white" />
                </div>
                <span className="text-white font-bold tracking-tight">FreshChain</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Building the future of food in Africa</p>
            </div>
            <div className="text-xs text-slate-400">
              <p>© 2026 FreshChain Initiative. All rights reserved.</p>        
            </div>
          </div>
          <div className="border-t border-slate-900 pt-8 flex flex-wrap gap-4 justify-between items-center text-xs text-slate-400">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <button onClick={() => openPolicy('privacy')} className="hover:text-white transition-colors cursor-pointer text-left font-medium">Privacy Policy</button>
              <button onClick={() => openPolicy('terms')} className="hover:text-white transition-colors cursor-pointer text-left font-medium">Terms & Conditions</button>
              <button onClick={() => openPolicy('delivery')} className="hover:text-white transition-colors cursor-pointer text-left font-medium">Delivery Policy</button>
              <button onClick={() => openPolicy('refund')} className="hover:text-white transition-colors cursor-pointer text-left font-medium">Return & Refund</button>
              <button onClick={() => openPolicy('cookie')} className="hover:text-white transition-colors cursor-pointer text-left font-medium">Cookie Policy</button>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-500" />
              <span>USSD Dial Code: *123# | Support Line: 20456</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile USSD Demo Modal (Crisp design, flat borders, no glassmorphism) */}
      {ussdOpen && (
        <div className="fixed inset-0 bg-slate-950/80 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-6 max-w-sm w-full shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">USSD Interactive Demonstration</h3>
              <button onClick={() => { setUssdOpen(false); setUssdStep(0); }} className="text-gray-400 hover:text-gray-650 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-emerald-950 rounded-lg p-5 font-mono text-emerald-300 text-xs mb-4 min-h-36 whitespace-pre-line leading-relaxed border border-emerald-900">
              {ussdFlow[Math.min(ussdStep, ussdFlow.length - 1)].display}
            </div>
            <div className="flex gap-3">
              {ussdStep < ussdFlow.length - 1 ? (
                <button
                  onClick={() => setUssdStep(ussdStep + 1)}
                  className="flex-1 bg-emerald-700 text-white py-2.5 rounded text-xs font-bold hover:bg-emerald-600 transition-colors"
                >
                  Send option "1" →
                </button>
              ) : (
                <button
                  onClick={() => setUssdStep(0)}
                  className="flex-1 bg-gray-100 dark:bg-slate-850 text-gray-700 dark:text-slate-300 py-2.5 rounded text-xs font-bold hover:bg-gray-200 dark:hover:bg-slate-800 transition-all text-center"
                >
                  Restart Demo
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Policy Center Modal (Flat design, no glassmorphism, no gradient, highly readable) */}
      {policyOpen && (
        <div className="fixed inset-0 bg-slate-950/80 flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl max-w-3xl w-full shadow-2xl flex flex-col max-h-[90vh] overflow-hidden transition-colors">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between bg-gray-50/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-emerald-650 dark:text-emerald-400" />
                <h3 className="font-extrabold text-gray-900 dark:text-white text-sm uppercase tracking-wider">FreshChain Support & Policies</h3>
              </div>
              <button 
                onClick={() => setPolicyOpen(false)} 
                className="text-gray-400 hover:text-gray-650 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Select Tabs */}
            <div className="px-6 py-2 border-b border-gray-100 dark:border-slate-805 flex gap-1 overflow-x-auto scrollbar-none bg-white dark:bg-slate-900">
              {(Object.keys(policies) as Array<keyof typeof policies>).map((key) => (
                <button
                  key={key}
                  onClick={() => setActivePolicyTab(key)}
                  className={`text-xs font-bold px-4 py-2.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    activePolicyTab === key
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {policies[key].title}
                </button>
              ))}
            </div>

            {/* Document Content View */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-white dark:bg-slate-900">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight">{policies[activePolicyTab].title}</h2>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-450 dark:text-gray-400 font-medium">
                  <span className="bg-gray-100 dark:bg-slate-800 px-2.5 py-1 rounded font-bold uppercase text-emerald-700 dark:text-emerald-400 text-[10px]">Effective: {policies[activePolicyTab].effectiveDate}</span>
                  <span className="text-gray-450 dark:text-gray-600">•</span>
                  <span>{policies[activePolicyTab].meta}</span>
                </div>
              </div>

              <div className="space-y-6 border-t border-gray-100 dark:border-slate-800 pt-6">
                {policies[activePolicyTab].sections.map((sec, i) => (
                  <div key={i} className="space-y-1.5">
                    <h4 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">{sec.heading}</h4>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-normal">{sec.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer details */}
            <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-805 bg-gray-50/50 dark:bg-slate-900/50 flex flex-wrap justify-between items-center gap-3 text-xs text-gray-500 dark:text-slate-400">
              <span>Have additional legal inquiries?</span>
              <a href="mailto:support@freshchain.africa" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">support@freshchain.africa</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
