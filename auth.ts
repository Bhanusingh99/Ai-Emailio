import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { NextAuthConfig, Session } from "next-auth";
import axios from "axios";

export const config: NextAuthConfig = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    Google({
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          scope: [
            "openid",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/gmail.readonly",
            "https://www.googleapis.com/auth/calendar",
          ].join(" "),
          response: "code",
        },
      },
    }),
  ],
  basePath: "/api/auth",
  callbacks: {
    authorized({ request, auth }) {
      return !!auth;
    },
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          access_token: account.access_token,
          issued_at: Date.now(),
          expires_at: Date.now() + Number(account.expires_in) * 1000,
          refresh_token: account.refresh_token,
        };
      } else if (Date.now() < Number(token.expires_at)) {
        return token;
      } else {
        try {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID as string,
              client_secret: process.env.AUTH_GOOGLE_SECRET as string,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token as string,
            }),
            method: "POST",
          });

          const tokens = await response.json();

          if (!response.ok) throw tokens;

          return {
            ...token,
            access_token: tokens.access_token,
            expires_at: Date.now() + Number(tokens.expires_in) * 1000,
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
    },
    async session({ session, token }) {
      try {
        // Fetch only email headers initially
        const response = await fetch(
          "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=60&metadata.headers",
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const emails = await response.json();

        // Collect email details in an array
        const emailDetails: {
          subject: string;
          snippet: string;
          body: string;
          sender: string;
          recipient: string;
        }[] = [];

        // Batch processing to fetch emails in batches
        const promises = emails.messages.map(async (message: any) => {
          const emailResponse = await fetch(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
            {
              headers: {
                Authorization: `Bearer ${token.access_token}`,
                "Content-Type": "application/json",
              },
            }
          );
          const emailData = await emailResponse.json();

          // Extract email details
          const subjectHeader = emailData.payload.headers.find(
            (header: any) => header.name === "Subject"
          );
          const subject = subjectHeader ? subjectHeader.value : "No Subject";
          const sender =
            emailData.payload.headers.find(
              (header: any) => header.name === "From"
            )?.value || "Unknown";
          const recipient =
            emailData.payload.headers.find(
              (header: any) => header.name === "To"
            )?.value || "Unknown";
          let body = "No Body";

          // Extract body
          const parts = emailData.payload.parts;
          if (parts) {
            const part = parts.find(
              (part: { mimeType: string }) =>
                part.mimeType === "text/plain" || part.mimeType === "text/html"
            );
            if (part && part.body && part.body.data) {
              const bodyData = part.body.data;
              body = Buffer.from(bodyData, "base64").toString("utf-8");
            }
          } else if (emailData.payload.body && emailData.payload.body.data) {
            const bodyData = emailData.payload.body.data;
            body = Buffer.from(bodyData, "base64").toString("utf-8");
          }

          // Push email details into emailDetails array
          emailDetails.push({
            subject,
            snippet: emailData.snippet,
            body,
            sender,
            recipient,
          });
        });

        // Wait for all promises to resolve
        await Promise.all(promises);

        // Log all email details at once
        const postAllEmailsToDB = async () => {
          try {
            const res = await axios.post(
              "http://localhost:4000/api/emails/save-all-emails",
              { emails: emailDetails }
            );
          } catch (error) {}
        };
        postAllEmailsToDB();

        return {
          ...session,
          accessToken: String(token.access_token),
          refreshToken: String(token.refresh_token),
          accessTokenIssuedAt: Number(token.issued_at),
          accessTokenExpiresAt: Number(token.expires_at),
        };
      } catch (error) {
        console.error("Error fetching emails:", error);
        return { ...session }; // Return session without modifications in case of error
      }
    },
  },
};

export interface EnrichedSession extends Session {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  accessTokenIssuedAt: number;
}

export const { handlers, auth, signIn, signOut } = NextAuth(config);
