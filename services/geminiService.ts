
import { GoogleGenAI } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartBuddyResponse = async (type: 'riddle' | 'praise' | 'fact', score?: number) => {
  const model = 'gemini-3-flash-preview';
  
  let prompt = "";
  if (type === 'riddle') {
    prompt = "Bolalar uchun juda oddiy va qiziqarli o'zbek tilida bitta topishmoq va uning javobini yoz. Javobni qavs ichida ko'rsat.";
  } else if (type === 'praise') {
    prompt = `Bolani o'yinda ${score} ball to'plagani uchun o'zbek tilida juda xursand bo'lib maqtab qo'y va keyingi safar yanada ko'proq ball to'plashiga dalda ber.`;
  } else {
    prompt = "Hayvonlar yoki koinot haqida bolalar uchun bitta hayratlanarli va qiziqarli faktni o'zbek tilida aytib ber.";
  }

  try {
    // Generate content using the recommended pattern for text answers
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: "Siz bolajonlarning eng yaqin do'sti 'Donishmand Boyo'g'li'siz. Nutqingiz quvnoq, mehribon va bolalarga tushunarli bo'lishi kerak.",
        temperature: 0.8,
      }
    });
    // The simplest and most direct way to get text content is via the .text property
    return response.text || "Uzr bolajonim, biroz charchadim. Keyinroq gaplashamiz!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Internetimiz biroz sekin ishlayapti, lekin sen baribir zukko bolajonsan!";
  }
};
