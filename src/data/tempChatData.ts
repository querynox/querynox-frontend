import type { Chat } from "./types";

// Helper to create staggered, realistic timestamps in the past
const generateTimestamps = (count: number): string[] => {
  const now = new Date();
  // Start the last message a few minutes ago
  const baseTime = now.getTime() - 5 * 60 * 1000;
  const timestamps: string[] = [];

  for (let i = 0; i < count; i++) {
    // Each preceding message is further in the past by a random amount (e.g., 1 to 10 minutes)
    const randomMinutesAgo = (count - i) * (Math.random() * 9 + 1);
    const timestamp = new Date(baseTime - randomMinutesAgo * 60 * 1000);
    timestamps.push(timestamp.toISOString());
  }
  return timestamps;
};

// Generate unique timestamp arrays for each chat
const chat1Timestamps = generateTimestamps(8);
const chat2Timestamps = generateTimestamps(10);
const chat3Timestamps = generateTimestamps(10);
const chat4Timestamps = generateTimestamps(12);
const chat5Timestamps = generateTimestamps(10);
const chat6Timestamps = generateTimestamps(10);
const chat7Timestamps = generateTimestamps(10);


export const chats: Chat[] = [
  {
    _id: 'chat-1',
    userId: 'user-123',
    title: 'Web Search Enabled',
    model: 'Claude Haiku 3.5',
    systemPrompt: 'You are a helpful assistant. Current date is July 25, 2025. Location is Pimpri-Chinchwad, India.',
    webSearch: true,
    messages: [
      { _id: 'chat-1-msg-0', role: 'user', content: 'What\'s the weather like here today?', createdAt: chat1Timestamps[0] },
      { _id: 'chat-1-msg-1', role: 'assistant', content: 'Searching the web... The weather in Pimpri-Chinchwad today is mostly sunny with a high of 31°C. There\'s a slight chance of afternoon showers.', createdAt: chat1Timestamps[1] },
      { _id: 'chat-1-msg-2', role: 'user', content: 'Any interesting events happening this weekend?', createdAt: chat1Timestamps[2] },
      { _id: 'chat-1-msg-3', role: 'assistant', content: 'Let me check... This weekend, there is a large farmers\' market at the PCMC grounds and a live music performance at Phoenix Marketcity. Would you like more details on either of those?', createdAt: chat1Timestamps[3] },
      { _id: 'chat-1-msg-4', role: 'user', content: 'Tell me about the live music.', createdAt: chat1Timestamps[4] },
      { _id: 'chat-1-msg-5', role: 'assistant', content: 'A popular local band, "The Pune Collective," is playing a free concert on Saturday evening at 7 PM in the courtyard of Phoenix Marketcity mall.', createdAt: chat1Timestamps[5] },
      { _id: 'chat-1-msg-6', role: 'user', content: 'Sounds great, thanks!', createdAt: chat1Timestamps[6] },
      { _id: 'chat-1-msg-7', role: 'assistant', content: 'You\'re welcome! Enjoy the show.', createdAt: chat1Timestamps[7] },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    files: []
  },
  {
    _id: 'chat-2',
    userId: 'user-123',
    title: 'Debugging Help',
    model: 'Claude Haiku 3.5',
    webSearch: false,
    messages: [
      { _id: 'chat-2-msg-0', role: 'user', content: 'Hey, I\'m getting a `TypeError: Cannot read properties of undefined (reading \'map\')` in my React component. Here\'s the code:\n```javascript\nfunction ItemList({ items }) {\n  return (\n    <ul>\n      {items.map(item => <li key={item.id}>{item.name}</li>)}\n    </ul>\n  );\n}\n```', createdAt: chat2Timestamps[0] },
      { _id: 'chat-2-msg-1', role: 'assistant', content: 'Hi there! This error typically happens when the `items` prop is `undefined` when the component first renders. The `.map()` function can only be called on an array.', createdAt: chat2Timestamps[1] },
      { _id: 'chat-2-msg-2', role: 'user', content: 'Ah, that makes sense. The data is coming from an API call, so it\'s probably not there on the initial render. How do I fix it?', createdAt: chat2Timestamps[2] },
      { _id: 'chat-2-msg-3', role: 'assistant', content: 'You have two common options. The quickest fix is to provide a default prop value, ensuring `items` is always an array:\n```javascript\nfunction ItemList({ items = [] }) { ... }\n```', createdAt: chat2Timestamps[3] },
      { _id: 'chat-2-msg-4', role: 'user', content: 'What\'s the other option?', createdAt: chat2Timestamps[4] },
      { _id: 'chat-2-msg-5', role: 'assistant', content: 'The other option is to add a conditional render. This is useful if you want to show a loading state:\n```javascript\nfunction ItemList({ items }) {\n  if (!items) {\n    return <p>Loading...</p>;\n  }\n\n  return (\n    <ul>\n      {items.map(item => <li key={item.id}>{item.name}</li>)}\n    </ul>\n  );\n}\n```', createdAt: chat2Timestamps[5] },
      { _id: 'chat-2-msg-6', role: 'user', content: 'I like the conditional render better, it improves the UX. Let me try that.', createdAt: chat2Timestamps[6] },
      { _id: 'chat-2-msg-7', role: 'assistant', content: 'Sounds like a plan. That should resolve the error and provide feedback to your users while the data is being fetched.', createdAt: chat2Timestamps[7] },
      { _id: 'chat-2-msg-8', role: 'user', content: 'It worked perfectly! The "Loading..." message shows up and then the list populates. Thanks!', createdAt: chat2Timestamps[8] },
      { _id: 'chat-2-msg-9', role: 'assistant', content: 'Excellent! Glad I could help. Happy coding!', createdAt: chat2Timestamps[9] },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    files: []
  },
  {
    _id: 'chat-3',
    userId: 'user-123',
    title: 'React Best Practices',
    model: 'GPT-4',
    webSearch: false,
    messages: [
        { _id: 'chat-3-msg-0', role: 'user', content: 'I\'m starting a new, large React project. What is the currently recommended way to handle state management?', createdAt: chat3Timestamps[0] },
        { _id: 'chat-3-msg-1', role: 'assistant', content: 'Great question. For large-scale applications, the decision depends on your needs. Here\'s a breakdown:\n1.  **Redux Toolkit**: Still the industry standard for complex, global state. It\'s predictable, powerful, and has excellent dev tools.\n2.  **Zustand/Jotai**: These are gaining huge popularity. They are much simpler, less boilerplate-heavy alternatives to Redux for when you need shared state but don\'t want the ceremony of Redux.\n3.  **React Query/SWR**: For server state (API data, etc.), these are almost essential. They handle caching, re-fetching, and optimistic updates brilliantly, simplifying data fetching logic immensely.', createdAt: chat3Timestamps[1] },
        { _id: 'chat-3-msg-2', role: 'user', content: 'I\'ve used Redux before and found it a bit verbose. Tell me more about Zustand.', createdAt: chat3Timestamps[2] },
        { _id: 'chat-3-msg-3', role: 'assistant', content: 'Zustand is a small, fast, and scalable state management solution. It uses a simplified flux-like model based on hooks. You define a "store" as a simple object with state and action functions, and then you use a single hook in your components to access and update that state. There are no providers, actions, or reducers in the traditional Redux sense.', createdAt: chat3Timestamps[3] },
        { _id: 'chat-3-msg-4', role: 'user', content: 'Can I use Zustand and React Query together?', createdAt: chat3Timestamps[4] },
        { _id: 'chat-3-msg-5', role: 'assistant', content: 'Absolutely, and it\'s a highly recommended pattern. Use React Query for managing all your server state (fetching, caching, etc.) and use Zustand for managing global UI client state (e.g., "is a modal open?", "current theme", "form data in a multi-step wizard"). This separation of concerns keeps your code clean and organized.', createdAt: chat3Timestamps[5] },
        { _id: 'chat-3-msg-6', role: 'user', content: 'That makes a lot of sense. So, for my project, I should manage API data with React Query and keep things like the user session or theme in a Zustand store.', createdAt: chat3Timestamps[6] },
        { _id: 'chat-3-msg-7', role: 'assistant', content: 'Precisely. You\'ve got the modern best-practice approach down. It gives you the power of a dedicated server-state library and the simplicity of a minimal client-state library.', createdAt: chat3Timestamps[7] },
        { _id: 'chat-3-msg-8', role: 'user', content: 'Perfect. Thanks for clearing that up!', createdAt: chat3Timestamps[8] },
        { _id: 'chat-3-msg-9', role: 'assistant', content: 'You\'re welcome! Feel free to ask if you have more questions as you build out your project.', createdAt: chat3Timestamps[9] },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    files: []
  },
  {
    _id: 'chat-4',
    userId: 'user-123',
    title: 'Math Homework',
    model: 'GPT-4 Turbo',
    systemPrompt: 'You are a math tutor.',
    webSearch: false,
    messages: [
      { _id: 'chat-4-msg-0', role: 'user', content: 'Hi, I need help with a calculus problem. I have to find the derivative of f(x) = x^2 * sin(x).', createdAt: chat4Timestamps[0] },
      { _id: 'chat-4-msg-1', role: 'assistant', content: 'Of course. It looks like you have a function that is the product of two other functions: g(x) = x^2 and h(x) = sin(x). Do you remember which rule you need to use to find the derivative of a product of two functions?', createdAt: chat4Timestamps[1] },
      { _id: 'chat-4-msg-2', role: 'user', content: 'The product rule?', createdAt: chat4Timestamps[2] },
      { _id: 'chat-4-msg-3', role: 'assistant', content: 'Exactly! The product rule states that if f(x) = g(x)h(x), then the derivative is f\'(x) = g\'(x)h(x) + g(x)h\'(x). Can you find the derivatives of g(x) and h(x)?', createdAt: chat4Timestamps[3] },
      { _id: 'chat-4-msg-4', role: 'user', content: 'The derivative of x^2 is 2x. The derivative of sin(x) is cos(x).', createdAt: chat4Timestamps[4] },
      { _id: 'chat-4-msg-5', role: 'assistant', content: 'Perfect. So you have all the pieces: \ng(x) = x^2 \ng\'(x) = 2x \nh(x) = sin(x) \nh\'(x) = cos(x) \nNow, can you substitute these back into the product rule formula?', createdAt: chat4Timestamps[5] },
      { _id: 'chat-4-msg-6', role: 'user', content: 'Okay, so it would be (2x) * sin(x) + (x^2) * cos(x)?', createdAt: chat4Timestamps[6] },
      { _id: 'chat-4-msg-7', role: 'assistant', content: 'That is exactly right! The derivative of f(x) = x^2 * sin(x) is f\'(x) = 2x*sin(x) + x^2*cos(x). You did a great job applying the rule.', createdAt: chat4Timestamps[7] },
      { _id: 'chat-4-msg-8', role: 'user', content: 'Great! What if the function was x^2 / sin(x) instead?', createdAt: chat4Timestamps[8] },
      { _id: 'chat-4-msg-9', role: 'assistant', content: 'Good question! In that case, you would use the quotient rule, which is used for dividing two functions. The formula is a bit different: if f(x) = g(x) / h(x), then f\'(x) = (g\'(x)h(x) - g(x)h\'(x)) / [h(x)]^2.', createdAt: chat4Timestamps[9] },
      { _id: 'chat-4-msg-10', role: 'user', content: 'I see. So it would be (2x*sin(x) - x^2*cos(x)) / sin^2(x).', createdAt: chat4Timestamps[10] },
      { _id: 'chat-4-msg-11', role: 'assistant', content: 'You got it! You seem to have a good grasp of these rules.', createdAt: chat4Timestamps[11] },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    files: []
  },
  {
    _id: 'chat-5',
    userId: 'user-123',
    title: 'Startup Ideas',
    model: 'Claude 3 Opus',
    systemPrompt: 'You are a startup mentor.',
    webSearch: false,
    messages: [
      { _id: 'chat-5-msg-0', role: 'user', content: 'I want to build a "B2B SaaS" but I\'m not sure what problem to solve. I\'m a full-stack developer.', createdAt: chat5Timestamps[0] },
      { _id: 'chat-5-msg-1', role: 'assistant', content: 'That\'s a great place to start. The best B2B SaaS ideas often come from solving a problem you\'ve personally experienced. Think about your previous jobs. What was a repetitive, manual task that you or your team hated doing? What tool did you wish you had?', createdAt: chat5Timestamps[1] },
      { _id: 'chat-5-msg-2', role: 'user', content: 'Hmm, we always struggled with managing our cloud costs across AWS and GCP. It was a mess of spreadsheets trying to attribute costs to different teams or features.', createdAt: chat5Timestamps[2] },
      { _id: 'chat-5-msg-3', role: 'assistant', content: 'That is a fantastic, high-value problem. The space is called "FinOps" or Cloud Financial Management. It\'s a huge pain point for many companies. What would a dream solution have looked like for your team?', createdAt: chat5Timestamps[3] },
      { _id: 'chat-5-msg-4', role: 'user', content: 'Ideally, a dashboard that connects to both AWS and GCP, automatically tags resources, and shows us exactly how much the "authentication-service" or the "marketing-team" is spending, with alerts if they go over budget.', createdAt: chat5Timestamps[4] },
      { _id: 'chat-5-msg-5', role: 'assistant', content: 'Excellent. That\'s a clear value proposition. This is a competitive space with tools like Cloudability or Apptio, so the key is to find a niche. Who would you sell to first? A big enterprise or a small startup?', createdAt: chat5Timestamps[5] },
      { _id: 'chat-5-msg-6', role: 'user', content: 'I think startups and small-to-medium businesses would be easier to sell to. They are probably still using spreadsheets and feeling the pain acutely, but can\'t afford the big enterprise solutions.', createdAt: chat5Timestamps[6] },
      { _id: 'chat-5-msg-7', role: 'assistant', content: 'That\'s a strong strategic decision. Your go-to-market could be "FinOps for Startups". Your MVP (Minimum Viable Product) could focus on doing just one thing really well: providing a unified view of AWS and GCP costs with simple team-based attribution.', createdAt: chat5Timestamps[7] },
      { _id: 'chat-5-msg-8', role: 'user', content: 'I could build that. What would be the next step?', createdAt: chat5Timestamps[8] },
      { _id: 'chat-5-msg-9', role: 'assistant', content: 'Before you write a line of code, talk to 10-15 other developers or engineering managers at startups. Describe the problem and your proposed solution. See if they agree it\'s a pain point and if they would be willing to pay for your solution. This is called customer validation, and it\'s the most important first step.', createdAt: chat5Timestamps[9] },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    files: []
  },
  {
    _id: 'chat-6',
    userId: 'user-123',
    title: 'Code Review Session',
    model: 'GPT-3.5',
    webSearch: false,
    messages: [
      { _id: 'chat-6-msg-0', role: 'user', content: 'Could you review this small JavaScript function for me? It\'s supposed to get a user and their posts.\n```javascript\nfunction getUserWithPosts(userId) {\n  const user = fetch(`https://api.example.com/users/${userId}`).then(res => res.json());\n  const posts = fetch(`https://api.example.com/posts?userId=${userId}`).then(res => res.json());\n  return { user, posts };\n}\n```', createdAt: chat6Timestamps[0] },
      { _id: 'chat-6-msg-1', role: 'assistant', content: 'Certainly. There\'s a subtle bug in this code related to how Promises work. When you call `fetch`, it returns a Promise, not the final JSON data. Your function is currently returning an object where `user` and `posts` are both Promises, not the actual data.', createdAt: chat6Timestamps[1] },
      { _id: 'chat-6-msg-2', role: 'user', content: 'Oh, I see. So how do I wait for them to finish?', createdAt: chat6Timestamps[2] },
      { _id: 'chat-6-msg-3', role: 'assistant', content: 'You should use `async/await` and `Promise.all` to handle this. `Promise.all` is perfect when you want to run multiple promises in parallel and wait for all of them to complete.', createdAt: chat6Timestamps[3] },
      { _id: 'chat-6-msg-4', role: 'user', content: 'Can you show me how to rewrite it?', createdAt: chat6Timestamps[4] },
      { _id: 'chat-6-msg-5', role: 'assistant', content: 'Of course. Here is the revised, more robust version:\n```javascript\nasync function getUserWithPosts(userId) {\n  try {\n    const [userResponse, postsResponse] = await Promise.all([\n      fetch(`https://api.example.com/users/${userId}`),\n      fetch(`https://api.example.com/posts?userId=${userId}`)\n    ]);\n\n    // Add error handling for bad responses\n    if (!userResponse.ok || !postsResponse.ok) {\n      throw new Error(\'Failed to fetch data\');\n    }\n\n    const user = await userResponse.json();\n    const posts = await postsResponse.json();\n\n    return { user, posts };\n  } catch (error) {\n    console.error(\'Error fetching user with posts:\', error);\n    return null; // Or handle the error as needed\n  }\n}\n```', createdAt: chat6Timestamps[5] },
      { _id: 'chat-6-msg-6', role: 'user', content: 'Wow, that\'s much better. It runs the fetches in parallel, waits for both, and even handles errors. I didn\'t know about `Promise.all`.', createdAt: chat6Timestamps[6] },
      { _id: 'chat-6-msg-7', role: 'assistant', content: 'It\'s a very powerful tool for improving performance and writing cleaner asynchronous code. Using a `try...catch` block with `async/await` is also standard practice for good error handling.', createdAt: chat6Timestamps[7] },
      { _id: 'chat-6-msg-8', role: 'user', content: 'This is super helpful. Thank you for the detailed explanation!', createdAt: chat6Timestamps[8] },
      { _id: 'chat-6-msg-9', role: 'assistant', content: 'You\'re welcome! It\'s a common pitfall with Promises, but now you have a solid pattern to use going forward.', createdAt: chat6Timestamps[9] },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    files: []
  },
  {
    _id: 'chat-7',
    userId: 'user-123',
    title: 'Docker & DevOps',
    model: 'Gemini 1.5 Pro',
    systemPrompt: 'You are a DevOps engineer.',
    webSearch: false,
    messages: [
      { _id: 'chat-7-msg-0', role: 'user', content: 'I need to create a Dockerfile for a production Python Flask application. What are the best practices for a small, secure image?', createdAt: chat7Timestamps[0] },
      { _id: 'chat-7-msg-1', role: 'assistant', content: 'Excellent question. The key to a good production Dockerfile is using multi-stage builds and a minimal base image. This dramatically reduces the final image size and attack surface.', createdAt: chat7Timestamps[1] },
      { _id: 'chat-7-msg-2', role: 'user', content: 'What base image do you recommend?', createdAt: chat7Timestamps[2] },
      { _id: 'chat-7-msg-3', role: 'assistant', content: 'For Python, `python:3.11-slim` is a great choice. It\'s much smaller than the default tag because it omits common build tools and packages that you don\'t need at runtime.', createdAt: chat7Timestamps[3] },
      { _id: 'chat-7-msg-4', role: 'user', content: 'Okay, and how would I structure the multi-stage build?', createdAt: chat7Timestamps[4] },
      { _id: 'chat-7-msg-5', role: 'assistant', content: 'Here’s a common and effective pattern:\n\n```dockerfile\n# 1. Builder stage: to install dependencies\nFROM python:3.11-slim as builder\nWORKDIR /app\nRUN python -m venv /opt/venv\nENV PATH="/opt/venv/bin:$PATH"\n\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\n# 2. Final stage: copy only what\'s needed\nFROM python:3.11-slim as final\nWORKDIR /app\n\n# Copy the virtual environment from the builder stage\nCOPY --from=builder /opt/venv /opt/venv\n\n# Copy application code\nCOPY . .\n\n# Set the path to use the venv\nENV PATH="/opt/venv/bin:$PATH"\n\n# Run as a non-root user for security\nRUN useradd --create-home appuser\nUSER appuser\n\n# Expose the port and run the app\nEXPOSE 5000\nCMD ["gunicorn", "--bind", "0.0.0.0:5000", "wsgi:app"]\n```', createdAt: chat7Timestamps[5] },
      { _id: 'chat-7-msg-6', role: 'user', content: 'I see. So you create a virtual environment in the `builder` stage and then just copy that over to the `final` stage. That\'s clever.', createdAt: chat7Timestamps[6] },
      { _id: 'chat-7-msg-7', role: 'assistant', content: 'Exactly. It keeps the final image clean. You also get the benefit of Docker\'s layer caching; the dependency layer will only be rebuilt if `requirements.txt` changes. Notice we also create a non-root user (`appuser`) to run the application, which is a critical security best practice.', createdAt: chat7Timestamps[7] },
      { _id: 'chat-7-msg-8', role: 'user', content: 'And you\'re using gunicorn, not the standard Flask development server.', createdAt: chat7Timestamps[8] },
      { _id: 'chat-7-msg-9', role: 'assistant', content: 'Correct. The built-in Flask server is not suitable for production. Gunicorn is a battle-tested, production-ready WSGI server. This Dockerfile gives you a secure, small, and efficient image ready for deployment.', createdAt: chat7Timestamps[9] },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    files: []
  }
];
