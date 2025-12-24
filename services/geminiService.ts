
import { GoogleGenAI } from "@google/genai";

const getSafeApiKey = () => {
  try {
    // استخدام فحص نوع المتغير لتجنب ReferenceError
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
    return "";
  } catch (e) {
    return "";
  }
};

export const generateLoveLetter = async (traits: string, context: string) => {
  const apiKey = getSafeApiKey();
  
  if (!apiKey) {
    return "حبيبتي، قلبي مليء بالكلمات لكِ، ولكن يبدو أن هناك عائقاً تقنياً يمنعني من صياغتها الآن بالذكاء الاصطناعي. اعلمي أنني أحبكِ فوق ما تصفه الحروف.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
      Write a deeply romantic, poetic, and heartwarming birthday letter for a girlfriend in Arabic.
      Traits to include: ${traits}.
      Special context: ${context}.
      The tone should be modern yet deeply emotional, using metaphors from nature and the stars.
      Format it as a beautiful letter with a title.
      Start with "حبيبتي الغالية..." and end with a romantic closing.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.9,
        topP: 0.95,
      }
    });

    return response.text || "عذراً حبيبتي، لم أستطع إيجاد الكلمات المناسبة الآن، لكن قلبي ينبض بحبك دائماً.";
  } catch (error) {
    console.error("Error generating letter:", error);
    return "لا توجد كلمات توصف حبي لكِ، لكن قلبي يخبركِ كل يوم أنكِ الأغلى في حياتي.";
  }
};
