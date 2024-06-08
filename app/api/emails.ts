// pages/api/emails.ts
import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

const gmail = google.gmail({
  version: "v1",
  auth: process.env.AUTH_GOOGLE_ID,
});

async function fetchEmails() {
  try {
    const msgRes = await gmail.users.messages.get({
      userId: "me",
      //@ts-ignore
      id: message.id,
      format: "full", // Specify the format of the message to retrieve (optional)
    });
    //@ts-ignore
    const messages = res.data.messages || [];
    const allEmails = [];

    for (const message of messages) {
      const msgRes = await gmail.users.messages.get({
        userId: "me",
        id: message.id,
      });

      allEmails.push(msgRes.data);
    }

    return allEmails;
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const emails = await fetchEmails();
      res.status(200).json({ emails });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
