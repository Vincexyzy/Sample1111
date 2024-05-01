import { GoogleGenerativeAI } from "@google/generative-ai";

export const genApiKey = "AIzaSyB3TzY9KYe3k3bqCp7X4Z0Mvyy_b_gw3bc";

/**
 * Calls the Gemini API to generate content based on the provided prompt.
 *
 * @param {string} prompt - The prompt for generating content.
 * @param {string} genApiKey - Your Google Generative AI API key.
 * @returns {Promise<string>} - A promise that resolves to the generated text.
 */
export const gemini = async (prompt, genApiKey) => {
  try {
    // Initialize Google Generative AI with your API key
    const genAI = new GoogleGenerativeAI(genApiKey);

    // Get the generative model (gemini-pro)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content based on the prompt
    const result = await model.generateContent(prompt);

    // Get the response from the result
    const response = await result.response;

    // Convert the response to text
    const text = await response.text();

    // Return the generated text
    return text;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
