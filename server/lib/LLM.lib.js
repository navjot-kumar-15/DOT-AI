import Groq from "groq-sdk";
import { config } from "dotenv";
config();
import { tavily } from "@tavily/core";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generate_message(data) {
  let messages = [
    {
      role: "system",
      content: `Im Navjot bot your personal assistant,
        You have the following access tools:
        1 webSearch({query}:{query:string}) // Search the latest information and realtime data  on the web
        Current date and time : ${new Date().toISOString()}

        response should be structured format so user will understand easily.
        `,
    },
  ];

  while (true) {
    messages.push({ role: "user", content: data.query });

    if (
      data.query === "exit" ||
      data.query === "quit" ||
      data.query === "bye"
    ) {
      break;
    }
    while (true) {
      const completion = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: messages,
        tools: [
          {
            type: "function",
            function: {
              name: "webSearch",
              description:
                "Search the latest information and realtime data  on the web",
              parameters: {
                type: "object",
                properties: {
                  query: {
                    type: "string",
                    description: "the search query to perform search on.",
                  },
                },
                required: ["query"],
              },
            },
          },
        ],
        tool_choice: "auto",
      });

      const toolCalls = completion.choices[0].message.tool_calls;
      if (!toolCalls) {
        console.log(`AI:${completion.choices[0].message}`);
        return completion.choices[0].message;
      }

      for (let tool of toolCalls) {
        console.log("Tools:", tool);
        let funcName = tool.function.name;
        let funcParams = JSON.parse(tool.function.arguments);
        if (funcName === "webSearch") {
          let toolResult = await webSearch(funcParams);
          // console.log("Tool result: ", toolResult);
          messages.push({
            tool_call_id: tool.id,
            role: "tool",
            name: funcName,
            content: toolResult,
          });
        }
      }
    }
  }
}

async function webSearch({ query }) {
  const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });
  const response = await tvly.search(query, {
    auto_parameters: true,
    topic: "general",
    search_depth: "advanced",
    // max_results: 1,
    include_images: true,
  });
  console.log("Calling websearch");

  let finalResponse = response.results.map((v) => v.content).join("\n\n");

  return finalResponse;
}
