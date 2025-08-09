import { BACKEND_URL } from "@/data/constants";
import type { CreateChatInputType, StreamChatOutputType } from "@/data/types";

export const streamSSE = async (
    input:CreateChatInputType,
    onData:(response:StreamChatOutputType) => void,
    onEnd:() => void,
    onError:(error:any) => void,
) => {
  try {

    const formData = new FormData();
    formData.append("clerkUserId",input.clerkUserId);
    formData.append("prompt",input.prompt);
    formData.append("model",input.model);
    formData.append("systemPrompt",input.systemPrompt);
    formData.append("webSearch",input.webSearch ? "true" : "false");
    
    Array.from(input.files).forEach((file) => {
        formData.append("files", file);
    });

    const URL = input.chatId ? `${BACKEND_URL}/api/chat/${input.chatId}/stream` : `${BACKEND_URL}/api/chat/stream`

    const response = await fetch(URL, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "text/event-stream",
      },
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    if (!reader) throw new Error("No stream found");

    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Process SSE lines
      const lines = buffer.split("\n");
      for (const line of lines) {
        if (line.startsWith("data:")) {
          const chunk = line.replace(/^data:\s*/, "");
          onData(JSON.parse(chunk));
        }
      }

      // Clear buffer only if all lines ended cleanly
      if (buffer.endsWith("\n")) buffer = "";
    }

    if (onEnd) onEnd();
  } catch (err) {
    if (onError) onError(err);
    else console.error("Stream failed:", err);
  }
};