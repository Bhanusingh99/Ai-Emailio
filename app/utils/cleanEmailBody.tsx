// Utility function to clean the email body by removing URLs and unnecessary characters
export const cleanEmailBody = (body: string): string => {
  // Remove URLs
  let cleanedBody = body.replace(/https?:\/\/[^\s]+/g, "");

  // Remove unnecessary characters and extra spaces
  cleanedBody = cleanedBody
    .replace(/[\*\[\]\(\)\/]/g, " ") // Replace specific characters with spaces
    .replace(/\s\s+/g, " ") // Replace multiple spaces with a single space
    .trim(); // Trim leading and trailing spaces

  return cleanedBody;
};
