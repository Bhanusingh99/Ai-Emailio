# Ai-Emailio

## Overview

Ai-Emailio is a web application that allows users to log in using Google OAuth, fetch their last X emails from Gmail, and classify them into different categories using OpenAI GPT-4. This project is designed for a Full-Stack Engineer Intern Assignment.

## Features

- User Authentication with Google OAuth
- Fetch emails from Gmail using the Gmail API
- Classify emails into categories using Google Gemini
- Store user data in MongoDB

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

![Logo](/cred1.png)
![Logo](/credentials.png)

make sure to enabled Google Gmail api
![Logo](/gmailapi.png)

make sure to enable Google Generative Language API
![Logo](/geminiapi.png)

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
