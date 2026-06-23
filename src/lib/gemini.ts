export async function scanCropHealth(imageBase64: string) {
  const res = await fetch('/api/ai/crop-scanner', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageBase64 }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || 'Crop health scanning failed.');
  }

  return res.json();
}

export async function getNutritionInfo(foodItem: string) {
  const prompt = `Provide detailed nutrition information for ${foodItem}. Include health benefits, key nutrients, and why it's good for a healthy diet in Africa. Return a concise summary.`;
  
  const res = await fetch('/api/ai/nutribot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      message: prompt,
      history: []
    }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || 'NutriBot query failed.');
  }

  const data = await res.json();
  return data.reply;
}

