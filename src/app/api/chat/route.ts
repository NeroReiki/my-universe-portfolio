import { portfolioKnowledge } from "@/data/portfolioKnowledge";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";


// #region API SETTINGS

// Use the Node.js runtime for the Gemini SDK.
export const runtime = "nodejs";

// Do not cache chat responses.
export const dynamic = "force-dynamic";

// This is a LOCAL DEVELOPMENT test only.
// We will add production protections before deployment.
const MAX_MESSAGE_LENGTH = 500;

// #endregion

// #region HEALTH CHECK

export async function GET() {
  return Response.json({
    status: "ok",
    service: "My Universe AI",
    message: "Chat API route is working.",
  });
}

// #endregion

// #region GEMINI CHAT API

export async function POST(request: Request) {
  // #region LOCAL TEST PROTECTION

  // Disable this test endpoint in production
  // until we add rate limiting and safeguards.
  if (process.env.NODE_ENV !== "development") {
    return Response.json(
      { error: "Chat is not enabled yet." },
      { status: 503 }
    );
  }

  // #endregion

  // #region CHECK API KEY

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        error:
          "Gemini API key is missing. Check your .env.local file.",
      },
      { status: 500 }
    );
  }

  // #endregion

  // #region VALIDATE USER MESSAGE

  let body: unknown;

  try {
    const rawBody = await request.text();

    if (rawBody.length > 2000) {
      return Response.json(
        { error: "Request is too large." },
        { status: 413 }
      );
    }

    body = JSON.parse(rawBody);
  } catch {
    return Response.json(
      { error: "Invalid JSON request." },
      { status: 400 }
    );
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("message" in body) ||
    typeof body.message !== "string"
  ) {
    return Response.json(
      { error: "Please provide a text message." },
      { status: 400 }
    );
  }

  const message = body.message.trim();

  if (
    message.length === 0 ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return Response.json(
      {
        error:
          "Message must contain between 1 and 500 characters.",
      },
      { status: 400 }
    );
  }

  // #endregion

  // #region CALL GEMINI

  try {
    const ai = new GoogleGenAI({
      apiKey,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",

      contents: message,

      config: {
    
systemInstruction: `
  You are the AI assistant for the My Universe portfolio.

  Below is the verified portfolio knowledge.
  Use it to answer visitors' questions.

  <PORTFOLIO_KNOWLEDGE>
  ${portfolioKnowledge}
  </PORTFOLIO_KNOWLEDGE>

  IMPORTANT INSTRUCTIONS:
  - Answer questions using the provided portfolio facts.
  - The portfolio includes a Final Year Project
    about depression among medical students
    in Switzerland using multiple linear regression.
  - Never invent projects or experience.
  - If the information is not available, say so.
  - Be concise, friendly, and professional.
`,


        maxOutputTokens: 1024,
        thinkingConfig: {
        thinkingLevel: ThinkingLevel.LOW,
        },
      },
    });

    const reply = response.text?.trim();

    if (!reply) {
      return Response.json(
        {
          error:
            "Gemini did not return a text response.",
        },
        { status: 502 }
      );
    }

    return Response.json({
      reply,
    });
  } catch (error) {
    // Log useful diagnostics locally.
    // Never print your API key.
    console.error("Gemini API error:", error);

    return Response.json(
      {
        error:
          "Unable to get a Gemini response. Check the VS Code terminal for details.",
      },
      { status: 502 }
    );
  }

  // #endregion
}

// #endregion
