import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const GOOGLE_GEMINI_KEY = process.env.NEXT_PUBLIC_GEMINI_KEY as string;
const genAI = new GoogleGenerativeAI(GOOGLE_GEMINI_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    //   category: HarmCategory.HARM_CATEGORY_VIOLENCE,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  // Add or adjust categories and thresholds as needed
];

export const generateEmail = async (prompt: string) => {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(`${prompt} and 
        make sure to write email in this form {subject:"generated subject" ==> emailBody:"generated body"} so i can use it in my app, 
        make sure to return that email in object format, 
        and never forget to return my email in given format otherwise that will break my app just return pure object no json format`);

    const emailContent = result.response;
    //@ts-ignore
    const generatedEmail = emailContent.candidates[0].content.parts[0].text;

    return generatedEmail;
  } catch (error: any) {
    console.error("Error:", error.message);
    // Log error or handle it as needed
    return null;
  }
};
