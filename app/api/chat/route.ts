import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { getApplicationStatus, getUserData } from "@/lib/api";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { messages } = await req.json();

    const userData = await getUserData();
    const applicationStatus = await getApplicationStatus();

    const systemMessage = `
      You are an AI assistant for LIT School's application process. 
      
      Current user information:
      - Name: ${userData?.name || session.user.name || "Unknown"}
      - Email: ${userData?.email || session.user.email || "Unknown"}
      - Course: ${userData?.course || "Unknown"}
      - Application Status: ${applicationStatus?.status || "Unknown"}
      ${
        applicationStatus?.interviewDate
          ? `- Interview Date: ${new Date(
              applicationStatus.interviewDate
            ).toLocaleString()}`
          : ""
      }
      
      Your role is to:
      1. Help students understand their current application status
      2. Explain the next steps in the application process
      3. Answer questions about LIT School programs (Creator Marketer, Creatorpreneur, Next Gen Business)
      4. Provide guidance on interview preparation if applicable
      5. Explain the payment process for accepted students
      
      Be helpful, friendly, and concise. If you don't know the answer to a specific question, suggest that the student contact the admissions office.
    `;

    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages,
      system: systemMessage,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
