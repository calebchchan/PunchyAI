import { anthropic, buildRewriteSystemPrompt } from "@/lib/claude";
import { getScenarioById } from "@/lib/scenarios";

export async function POST(request: Request) {
  const { transcript, scenarioId } = await request.json();

  const scenario = getScenarioById(scenarioId);
  if (!scenario) {
    return new Response("Scenario not found", { status: 404 });
  }

  const systemPrompt = buildRewriteSystemPrompt(scenario);

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const messageStream = anthropic.messages.stream({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1024,
          system: systemPrompt,
          messages: [
            {
              role: "user",
              content: `Rewrite this to be punchier and more impactful:\n\n"${transcript}"`,
            },
          ],
        });

        messageStream.on("text", (text) => {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
          );
        });

        messageStream.on("end", () => {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        });

        messageStream.on("error", (error: Error) => {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: error.message })}\n\n`
            )
          );
          controller.close();
        });
      } catch (error) {
        const msg =
          error instanceof Error ? error.message : "Stream initialization failed";
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`)
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
