import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY, // Use this environment variable
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { tags } = req.body; // Receive tags from the request body

    if (!Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({ error: "Tags must be a non-empty array" });
    }

    // Join the tags into a prompt string
    const prompt = tags.join(', '); 
    const wordCount = tags.length; 

    try {
      const completion = await openai.chat.completions.create({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Generate a coherent sentence using the following words: ${prompt}.`,
          },
        ],
      });

      const generatedSentence = completion.choices[0].message.content;
      res.status(200).json({ sentence: generatedSentence });
    } catch (error) {
      console.error("Error fetching completion:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
