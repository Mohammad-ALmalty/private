
import { GoogleGenAI } from "@google/genai";

export const generateLoveLetter = async (traits: string, context: string) => {
  try {
    // جلب المفتاح الذي تم حقنه بواسطة Vite
    const apiKey = process.env.API_KEY;
    
    // تسجيل حالة المفتاح (بدون إظهار قيمته للأمان) لمساعدتنا في التتبع
    if (!apiKey || apiKey === "" || apiKey === "undefined") {
      console.error("DEBUG: API_KEY is missing from environment variables.");
      return "حبيبتي، قلبي مليء بالكلمات لكِ، ولكن يبدو أن هناك عائقاً تقنياً يمنعني من صياغتها الآن بالذكاء الاصطناعي. اعلمي أنني أحبكِ فوق ما تصفه الحروف.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      اكتب رسالة عيد ميلاد رومانسية جداً وشاعرية ودافئة لحبيبتي باللغة العربية.
      الصفات التي يجب تضمينها: ${traits}.
      السياق الخاص: ${context}.
      يجب أن يكون الأسلوب عاطفياً وعميقاً، مع استخدام استعارات من الطبيعة والنجوم.
      ابدأ بـ "حبيبتي الغالية..." وانتهِ بخاتمة رومانسية.
      يجب أن تنتهي الرسالة بتوقيع: "المحب لكِ للأبد، محمد".
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
    console.error("Gemini API Error:", error);
    return "حبيبتي الغالية، حاولت أن أصيغ لكِ أجمل الكلمات بالذكاء الاصطناعي ولكن مشاعري تجاهكِ أكبر من أن يصفها أي نظام. اعلمي أنني أحبكِ في كل ثانية، وكل عام وأنتِ بخير يا كل عمري.\n\nالمحب لكِ للأبد، محمد";
  }
};
