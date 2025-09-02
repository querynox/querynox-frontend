import type { CreateChatInputType, StreamChatOutputType } from "@/data/types";
import { useAuth } from "@clerk/clerk-react";
import { useCallback } from "react";

export const useStreamSSE = () => {
  const { getToken } = useAuth();

  const streamSSE = useCallback(
    async (
      input: CreateChatInputType,
      onData: (response: StreamChatOutputType) => void,
      onEnd: () => void,
      onError: (error: any) => void
    ) => {
      try {
        const formData = new FormData();
        formData.append("prompt", input.prompt);
        formData.append("model", input.model);
        formData.append("systemPrompt", input.systemPrompt);
        formData.append("webSearch", input.webSearch ? "true" : "false");

        Array.from(input.files).forEach((file) => {
          formData.append("files", file);
        });

        const URL = input.chatId
          ? `/api/v1/chat/${input.chatId}/stream`
          : `/api/v1/chat/stream`;

        const token = await getToken(); 

        console.log("🔄 Streaming to:", URL, "with token:", token ? "present" : "missing");
        
        const response = await fetch(URL, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "text/event-stream",
            authorization: `Bearer ${token}`,
          },
        });

        console.log("📡 Stream response status:", response.status, response.statusText);

        if (!response.ok) {
          const errorText = await response.clone().text();
          console.error("❌ Stream error response:", errorText);
          try {
            const errorData = JSON.parse(errorText);
            throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
          } catch {
            throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
          }
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder("utf-8");

        if (!reader) throw new Error("No stream found");

        let buffer = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          for (const line of lines) {
            if (line.startsWith("data:")) {
              const chunk = line.replace(/^data:\s*/, "");
              onData(JSON.parse(chunk));
            }
          }

          if (buffer.endsWith("\n")) buffer = "";
        }

        if (onEnd) onEnd();
      } catch (err) {
        if (onError) onError(err);
        else console.error(err);
      }
    },
    []
  );

  return streamSSE;
};