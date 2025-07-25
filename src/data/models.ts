export const models = [
  { modelName: "Claude Haiku 3.5" , modelCategory:"Text Generation"},
  { modelName: "llama-3.3-70b-versatile"  , modelCategory:"Text Generation"},
  { modelName: "gpt-3.5-turbo"  , modelCategory:"Text Generation"},
  { modelName: "gemini-2.5-flash"  , modelCategory:"Text Generation"},
  { modelName: "dall-e-3"  , modelCategory:"Image Generation"},
  { modelName: "gpt-image-1" , modelCategory:"Image Generation"},
];

export type ModelEnum = typeof models[number]["modelName"];