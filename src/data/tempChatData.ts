import type { Chat, Message } from "./types";

function generateMessages(count: number, prefix: string = ''): Message[] {
  const baseTime = Date.now();
  return Array.from({ length: count }).map((_, i) => ({
    _id: `${prefix}-msg-${i}`,
    role: i % 2 === 0 ? 'user' : 'assistant',
    content: i % 2 === 0
      ? `User message ${Math.floor(i / 2) + 1}`
      : `Assistant reply ${Math.floor(i / 2) + 1}`,
    createdAt: new Date(baseTime + (count + i) * 60_000).getTime().toString(),
  }));
}

export const chats: Chat[] = [
  {
    _id: 'chat-1',
    userId: 'user-123',
    title: 'Web Search Enabled',
    model: 'Claude Haiku 3.5',
    systemPrompt: 'You are a helpful assistant.',
    webSearch: true,
    messages: generateMessages(12, 'chat-1'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'chat-2',
    userId: 'user-123',
    title: 'Debugging Help',
    model: 'Claude Haiku 3.5',
    webSearch: false,
    messages: generateMessages(10, 'chat-2'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'chat-3',
    userId: 'user-123',
    title: 'React Best Practices',
    model: 'GPT-4',
    webSearch: false,
    messages: generateMessages(15, 'chat-3'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'chat-4',
    userId: 'user-123',
    title: 'Math Homework',
    model: 'GPT-4 Turbo',
    systemPrompt: 'You are a math tutor.',
    webSearch: false,
    messages: generateMessages(11, 'chat-4'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'chat-5',
    userId: 'user-123',
    title: 'Startup Ideas',
    model: 'Claude 3 Opus',
    systemPrompt: 'You are a startup mentor.',
    webSearch: false,
    messages: generateMessages(10, 'chat-5'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'chat-6',
    userId: 'user-123',
    title: 'Code Review Session',
    model: 'GPT-3.5',
    webSearch: false,
    messages: generateMessages(13, 'chat-6'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'chat-7',
    userId: 'user-123',
    title: 'Docker & DevOps',
    model: 'Gemini 1.5 Pro',
    systemPrompt: 'You are a DevOps engineer.',
    webSearch: false,
    messages: generateMessages(10, 'chat-7'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];