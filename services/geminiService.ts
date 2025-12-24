
import { GoogleGenAI } from "@google/genai";

export const generateLoveLetter = async (traits: string, context: string) => {
  // الحصول على المفتاح مباشرة من البيئة
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.error("API_KEY is missing in environment variables");
    return "حبيبتي، قلبي مليء بالكلمات لكِ، ولكن يبدو أن هناك عائقاً تقنياً يمنعني من صياغتها الآن بالذكاء الاصطناعي. اعلمي أنني أحبكِ فوق ما تصفه الحروف.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
      اكتب رسالة عيد ميلاد رومانسية جداً وشاعرية ودافئة لحبيبتي باللغة العربية.
      الصفات التي يجب تضمينها: ${traits}.
      السياق الخاص: ${context}.
      يجب أن يكون الأسلوب عاطفياً وعميقاً، مع استخدام استعارات من الطبيعة والنجوم.
      نسقها كرسالة جميلة مع عنوان.
      ابدأ بـ "حبيبتي الغالية..." وانتهِ بخاتمة رومانسية.
      
      ملاحظة هامة جداً:
      1. اسمي هو "محمد"، لذا يجب أن تنتهي الرسالة بتوقيعي: "المحب لكِ للأبد، محمد".
      2. لا تستخدم أبداً علامات النجوم (**) أو أي رموز تنسيق ماركداون في النص.
      3. لا تضع أي مربعات أو أقواس حول الاسم، اكتبه بشكل طبيعي ضمن النص.
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
