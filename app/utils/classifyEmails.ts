import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import {
  convertArrayToObject,
  createObjectFromArray,
} from "./convertArratToObject";

const GOOGLE_GEMINI_KEY = process.env.NEXT_PUBLIC_GEMINI_KEY as string;
const genAI = new GoogleGenerativeAI(GOOGLE_GEMINI_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

interface Email {
  sender: string;
  recipient: string;
  subject: string;
  snippet: string;
  body: string;
  category?: string;
}

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
    // category: HarmCategory.HARM_CATEGORY_VIOLENCE,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  // Add or adjust categories and thresholds as needed
];
export const classifyEmails = async (emails: Email[]) => {
  const batchSize = 30; // Adjust batch size as needed
  const classifiedEmails: Email[] = [];

  for (let i = 0; i < emails.length; i += batchSize) {
    const batch = emails.slice(i, i + batchSize);

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const emailSubjects = batch.map((email) => email.subject).join("\n\n");
      const prompt = `You're now a detective tasked with categorizing these emails.
       Review the subjects carefully and assign them into the following categories: Important, Promotional, Social, Marketing, and Spam.
        Use your intuition and keen eye to identify the true nature of each email.\n\n${emailSubjects} 
        just return one word for each emails like Important or Promotional or Social or Marketing or spam with subject name and make sure add subject with the label, i want result like this: subjectName ==> label `;

      const result = await chatSession.sendMessage(prompt);

      const classifications = result.response;
      //@ts-ignore
      const array: string[] = [];
      const value =
        //@ts-ignore
        classifications.candidates[0].content.parts[0].text?.split("\n");
      //@ts-ignore
      const check = createObjectFromArray(value);
      return check;
    } catch (error: any) {
      console.error("Error:", error.message);
      // Log error or handle it as needed
    }
  }
};
