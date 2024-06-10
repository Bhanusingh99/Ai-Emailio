# Ai-Emailio

## Overview

# Introducing Our Email Management Web App! 📧

Hey everyone! I am excited to share some cool features of our new web app that makes managing your emails super easy and efficient. Let's dive in! 🌊

## Send Emails with Ease! ✉️

Quick & Simple Sending: With our app, you can send emails directly. No need to open Gmail separately!

User-Friendly Interface: Just fill out the recipient's email, subject, and message, and hit send. It's that easy!

# Generate Emails Effortlessly! 📝

Prompt-Based Generation: Need to write an email but don't know where to start? Just type a prompt!

AI-Powered Writing: Our app uses the Google Gemini API to craft the perfect email for you.

One-Click Send: Once the email is generated, you can send it with a single click.

# Classify Your Emails Automatically! 📂

Smart Categorization: Our app fetches your emails using the Gmail API and sorts them into categories like:
Important
Promotional
Social
Marketing
Spam

Stay Organized: No more sifting through tons of emails. Find what you need quickly and easily!

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB Atlas account
- Google Cloud account with OAuth 2.0 credentials

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/Ai-Emailio.git
   cd Ai-Emailio
   ```
2. **Install Dependencies:**
   npm Install

3. **Make sure your google workspace should look like this**
   This is an example of a README file with an image.

![Alt text](/public/cred1.png)
![Alt text](/public/credentials.png)

make sure to enabled Google Gmail api
![Alt text](/public/gmailapi.png)

make sure to enable Google Generative Language API
![Alt text](/public/geminiapi.png)

3. **setup enviroment key**

   AUTH_GOOGLE_ID=<your-google-client-id>

   AUTH_GOOGLE_SECRET=<your-google-client-secret>

   AUTH_SECRET=<your-auth-secret>

   AUTH_API_KEY=<your-api-key>

   NEXT_PUBLIC_GEMINI_KEY=<your-gemini-key>

4. **start the server**

   npm run dev

5. **build the project**

   npm run build
