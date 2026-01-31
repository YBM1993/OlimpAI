
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT, JUDGE_PROMPT } from "../constants";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getCoachResponse = async (userMessage: string, code?: string) => {
  const ai = getAI();
  const fullPrompt = code 
    ? `Оқушы мынадай код жіберді:\n\`\`\`\n${code}\n\`\`\`\n\nОқушының сұрағы: ${userMessage}`
    : userMessage;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 4000 }
      },
    });
    return response.text || "Жаттықтырушымен байланыс үзілді.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "OlympAI-ға хабарласу кезінде қате орын алды.";
  }
};

export const runVirtualCode = async (code: string, input: string, language: string) => {
  const ai = getAI();
  const prompt = `Тіл: ${language}\n\nКОД:\n${code}\n\nINPUT:\n${input}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: JUDGE_PROMPT,
        temperature: 0.1, // Дәлдік үшін төмен температура
      },
    });
    return response.text || "Нәтиже бос.";
  } catch (error) {
    return `Қате: Кодты іске қосу мүмкін болмады. (${error instanceof Error ? error.message : 'Белгісіз қате'})`;
  }
};
