import { GoogleGenAI } from "@google/genai";

export const generateLoveLetter = async (traits: string, context: string) => {
  try {
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      console.error("Critical Error: API_KEY is missing from environment.");
      throw new Error("API_KEY_NOT_FOUND");
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

    return response.text || "أحبكِ جداً وكل عام وأنتِ بخير يا كل حياتي.";

  } catch (error) {
    console.error("Gemini Connection Error:", error);
    return `حبيبتي الغالية،

كل عام وأنتِ بخير يا كل حياتي. حاولت أن أكتب لكِ كلمات تصف ما في قلبي باستخدام الذكاء الاصطناعي، ولكن مشاعري الحقيقية نحوكِ أكبر من أن يصفها أي نظام تقني. اعلمي أنني أحبكِ في كل ثانية، وأنتِ أجمل ما حدث لي.

المحب لكِ للأبد، محمد ❤️`;
  }
};