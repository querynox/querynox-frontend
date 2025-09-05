import { BACKEND_HOST } from "@/data/constants";
import type { CreateChatInputType, StreamChatOutputType } from "@/data/types";
import { useAuth } from "@clerk/clerk-react";
import { useCallback } from "react";

export const useStreamSSE = () => {
  const { getToken } = useAuth();

  const streamSSE = useCallback(
    async (
      input: CreateChatInputType,
      onData: (response: StreamChatOutputType) => void,
      onError: (error: {error:Error | any,chatid:string}) => void
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
          ? `${BACKEND_HOST}/api/v1/chat/${input.chatId}/stream`
          : `${BACKEND_HOST}/api/v1/chat/stream`;

        const token = await getToken(); 

        
        const response = await fetch(URL, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "text/event-stream",
            authorization: `Bearer ${token}`,
            ...(BACKEND_HOST.includes("ngrok") && {
              "ngrok-skip-browser-warning": "true",
            }),
          },
        });


        if (!response.ok) {
          const errorText = await response.clone().text();
          const errorData = JSON.parse(errorText);
          onError(errorData)
          return;
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

      } catch (err) {
        console.error(err);
      }
    },
    []
  );

  return streamSSE;
};