// Replace with your actual OpenAI API key (store securely!)
const openAIKey = "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";

// Function to classify an email using GPT-4o
export async function classifyEmail(email: { subject: string; body: string }) {
  const summary = email.body.substring(0, 100); // Get first 100 characters as summary (adjust as needed)
  const categories = [
    "important",
    "promotional",
    "social",
    "marketing",
    "spam",
  ];

  const prompt = `This email is about: ${
    email.subject
  }\nSummary: ${summary}\nClassify the email as one of the following: ${categories.join(
    ", "
  )}`;

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAIKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // Replace with the appropriate GPT-4o model
      prompt,
      max_tokens: 1, // We only need the top prediction (category)
      temperature: 0, // Set temperature to 0 for more deterministic output
    }),
  });

  const data = await response.json();
  const predictedCategory = data; // Extract the predicted category

  return { ...email, category: predictedCategory }; // Return email object with added category
}

// Example usage
