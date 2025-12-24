import { GoogleGenAI } from "@google/genai";

export const generateLoveLetter = async (traits: string, context: string) => {
  try {
    const apiKey = process.env.API_KEY;
    
    if (!apiKey || apiKey === "undefined" || apiKey === "") {
      console.error("Critical: API_KEY is missing in the execution context.");
      throw new Error("API_KEY_MISSING");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      اكتب رسالة عيد ميلاد رومانسية جداً وشاعرية ودافئة لحبيبتي باللغة العربية.
      الصفات: ${traits}.
      السياق: ${context}.
      الأسلوب: عاطفي، عميق، شاعري.
      ابدأ بـ "حبيبتي الغالية..." وانتهِ بـ "المحب لكِ للأبد، محمد".
      لا تستخدم أي رموز تنسيق مثل علامات النجوم.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.9,
      }
    });

    return response.text || "أحبكِ جداً وكل عام وأنتِ بخير.";

  } catch (error) {
    console.error("Gemini Error:", error);
    return `حبيبتي الغالية،

كل عام وأنتِ بخير يا كل حياتي. حاولت أن أكتب لكِ كلمات تصف ما في قلبي، ولكن مشاعري نحوكِ أكبر من أي وصف. اعلمي أنني أحبكِ في كل يوم أكثر من الذي قبله.

المحب لكِ للأبد، محمد`;
  }
};