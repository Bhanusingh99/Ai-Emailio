# Ai-Emailio

## Overview

Ai-Emailio is a web application that allows users to log in using Google OAuth, fetch their last X emails from Gmail, and classify them into different categories using OpenAI GPT-4. This project is designed for a Full-Stack Engineer Intern Assignment.

## Features

- User Authentication with Google OAuth
- Fetch emails from Gmail using the Gmail API
- Classify emails into categories using OpenAI GPT-4
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

3. **setup enviroment key**
   AUTH_GOOGLE_ID=
   AUTH_GOOGLE_SECRET=
   AUTH_SECRET=
   AUTH_API_KEY=
   NEXT_PUBLIC_GEMINI_KEY=

4. **start the server**
   npm run dev

5. **build the project**
   npm run build
