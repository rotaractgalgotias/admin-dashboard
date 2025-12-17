import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function generateMdxFromText(text: string): Promise<{
    mdxContent: string;
}> {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
            responseMimeType: "application/json",
        },
        contents: [
            {
                role: "user",
                parts: [
                    {
                        text: `
You are an MDX content generator.

TASK:
- Convert the provided text into valid MDX.
- Return ONLY valid JSON.
- No explanations, no markdown fences, no extra text.

OUTPUT FORMAT (must be exact):
{
  "mdxContent": "<MDX_CONTENT_HERE>"
}

RULES:
- Always use the key "mdxContent"
- Value must be a single MDX string
- Output must be valid JSON

TEXT TO CONVERT:
${text}
`
                    }
                ]
            }
        ]
    });

    const textResponse = response.text;

    // Clean markdown fences just in case
    const cleanText =
        textResponse?.replace(/```json\n?|```/g, "").trim() || "{}";

    try {
        return JSON.parse(cleanText);
    } catch (error) {
        console.error("JSON Parsing Error:", error);

        return {
            mdxContent: textResponse ?? "",
        };
    }
}
