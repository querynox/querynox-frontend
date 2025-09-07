
# QueryNox - Deep Technical README

## 1. High-Level Architecture

QueryNox is a client-rendered Application built on React and Vite. The architecture is designed around a clear separation of concerns, leveraging a robust provider pattern for state management, a centralized routing system for navigation, and a well-defined API layer for communication with the backend.

The application initializes in `src/main.tsx`, which renders the root `App` component. The `App` component (`src/App.tsx`) is responsible for setting up all the core context providers, creating a nested structure that supplies the entire application with necessary state and functionality.

**Data Flow:**

1.  **Initialization**: `main.tsx` -> `App.tsx`.
2.  **Provider Setup**: `SystemProvider` -> `TanStackQueryProvider` -> `ClerkProvider` -> `ChatProvider` -> `UserProvider`. This order is crucial to ensure dependencies are met (e.g., `ChatProvider` may need user data from `ClerkProvider`).
3.  **Routing**: `RouterProvider` (from TanStack Router) consumes the route tree and renders the appropriate page component based on the URL.
4.  **Page Render**: Page components (from `src/pages/`) are rendered.
5.  **Data Fetching**: Pages and their sub-components use custom hooks (e.g., `useQueryUserChats`) which internally use TanStack Query to fetch data from the backend.
6.  **State Management**:
    *   **Server State**: TanStack Query caches and manages all data from the backend.
    *   **UI/Client State**: React Contexts (`SystemContext`, `ChatContext`) manage client-side state like theme, sidebar status, and active chat UI state.
7.  **User Interaction**: User actions in components (e.g., sending a message in `InputBar.tsx`) trigger mutation hooks (`useMutationChat`) or update context state. This follows a unidirectional data flow, where state updates re-render the necessary components.

## 2. Core Modules & State Management

### 2.1. React Context Providers

The application relies heavily on the React Context API for managing global and shared state.

#### `SystemProvider` (`src/contexts/SystemContext.tsx`)

*   **Purpose**: Manages system-level UI state that persists across sessions.
*   **State**:
    *   `darkmode: boolean`: The current theme of the application.
    *   `isSidebarOpen: boolean`: The state of the main chat sidebar.
*   **Functionality**:
    *   It uses `localStorage` to persist the `darkmode` and `isSidebarOpen` states between sessions.
    *   An effect hook (`useEffect`) toggles the `dark` class on the `<html>` element to apply Tailwind CSS's dark mode styles.

#### `UserProvider` (`src/contexts/UserContext.tsx`)

*   **Purpose**: To hold application-specific user data fetched from the backend, separate from Clerk's authentication object.
*   **State**:
    *   `user: UserType | null`: Stores detailed user information, such as subscription status (`isPro`), usage quotas, etc.
*   **Functionality**: This context acts as a simple wrapper around a `useState` hook, providing the `user` object and a `setUser` function to the rest of the app. It's populated in `Chat.tsx` after a successful fetch from `useQueryUserInfo`.

#### `ChatProvider` (`src/contexts/ChatContext.tsx`)

*   **Purpose**: The central state machine for all chat-related functionality. This is the most complex context.
*   **State**:
    *   `chats: ChatType[]`: An array of all chat sessions for the logged-in user.
    *   `newChat: ChatType`: A state object representing a new, unsaved chat session. It holds the model selection, files, web search toggle, etc., before the first message is sent.
    *   `activeChatIndex: number`: The index in the `chats` array that corresponds to the currently viewed chat. `-1` indicates a new chat.
    *   `activeChat: ChatType`: A memoized object that represents the currently active chat, derived from `chats[activeChatIndex]` or `newChat`.
    *   `streamingResponse: {chatid:string, content:string}`: Holds the content of a streaming AI response as it arrives.
    *   `chatError: {chatid:string, content:string}`: Holds any error messages related to a specific chat.
    *   `chatStatus: {chatid:string, content:string}`: Holds status updates during a chat query (e.g., "Searching the web...").
*   **Functionality**: This provider encapsulates all the logic for managing the chat UI state. An effect hook synchronizes `activeChat` based on `activeChatIndex`, `chats`, and `newChat`, ensuring the UI always displays the correct conversation.

### 2.2. Server State with TanStack Query

TanStack Query is used to manage all asynchronous operations and server state. This includes data fetching, caching, and mutations. Custom hooks are created for each API endpoint to provide a clean, reusable interface.

#### Queries (`src/pages/chat/apis/queries/`)

*   `useQueryUserChats`: Fetches the list of all chat sessions for a user.
*   `useQueryMessages`: Fetches the message history for a specific chat ID.
*   `useQueryModels`: Fetches the list of available AI models from the backend.
*   `useQueryUserInfo`: Fetches the detailed user profile (pro status, etc.).

These hooks abstract away the TanStack Query implementation details and provide simple data, error, and loading states to the components.

#### Mutations (`src/pages/chat/apis/mutations/`)

*   **`useMutationChat`**: This is the core mutation for handling non-streaming chat messages (primarily for image generation models).
    *   **Functionality**: It wraps TanStack Query's `useMutation`. The `mutationFn` constructs a `FormData` object containing the prompt, model details, and any uploaded files.
    *   **Authentication**: It uses Clerk's `useAuth` hook to get the JWT (`getToken()`) which is then passed in the `Authorization` header of the API request.
    *   **Error Handling**: It has a robust `try-catch` block that specifically handles `AxiosError` to propagate backend validation errors to the UI.

## 3. Application Flow & Data Lifecycle

### 3.1. App Initialization and Provider Setup

As seen in `src/App.tsx`, the application is wrapped in a series of providers.

```tsx
// src/App.tsx (simplified)
<SystemProvider>
  <TanStackQueryProvider>
    <ClerkProvider>
      <ChatProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </ChatProvider>
    </ClerkProvider>
  </TanStackQueryProvider>
</SystemProvider>
```

This strict hierarchy ensures that hooks like `useChatContext` can safely access values from `useUser` (Clerk) because `ClerkProvider` is a parent of `ChatProvider`.

### 3.2. Chat Functionality: From Input to Render

This is the most critical data flow in the application.

1.  **User Input**: The user types a message in the `TextareaAutosize` component within `InputBar.tsx`.
2.  **Trigger**: The user clicks the "Send" button or presses Enter, which calls the `sendChatStream` function in `InputBar.tsx`.
3.  **State Update (Optimistic UI)**:
    *   A new `chatQuery` object is created with a temporary, client-generated UUID.
    *   The `ChatContext` state is updated immediately. If it's a new chat, the `newChat` object's `chatQueries` array is populated. If it's an existing chat, the `chats` array is updated for the `activeChatIndex`.
    *   This optimistic update makes the user's message appear in the `Conversation.tsx` component instantly.
4.  **Streaming with SSE**:
    *   The `sendChatStream` function calls the `streamSSE` hook (`src/pages/chat/apis/fetch/streamSSE.tsx`).
    *   `streamSSE` uses the browser's native `fetch` API to make a POST request to the backend's `/stream` endpoint. It sends a `FormData` object. The `Accept: 'text/event-stream'` header is crucial.
    *   It gets a `ReadableStream` from the response and uses a `TextDecoder` to process the incoming data chunk by chunk.
5.  **Processing Stream Events**:
    *   The `streamSSE` hook takes callback functions (`onData`, `onError`).
    *   Inside the `while` loop, it parses the data from the stream. The backend sends events like `data: {"type": "content", "content": "..."}`.
    *   Based on the `type` of the event (`status`, `content`, `complete`, `error`), it calls the appropriate callback.
6.  **Live Context Updates**:
    *   The callbacks in `InputBar.tsx` update the `ChatContext` state in real-time.
    *   `case 'content'`: The `streamingResponse.content` state is continuously appended with new tokens.
    *   `case 'status'`: The `chatStatus` is updated to show messages like "Analyzing documents...".
    *   `case 'complete'`: When the stream is finished, the backend sends the final, saved `chatQuery` object. The `handleSuccessfulMutation` function is called.
7.  **Finalizing the State**:
    *   `handleSuccessfulMutation` replaces the optimistically-created chat query with the final version from the backend (which has a permanent `_id` from the database).
    *   If it was a new chat, the new chat session is added to the top of the `chats` array, `activeChatIndex` is set to `0`, and the user is navigated to the new URL (`/chat/:chatId`). The `newChat` state is reset.
8.  **UI Re-render**:
    *   The `Conversation.tsx` component is subscribed to `ChatContext`. As `streamingResponse`, `chats`, and `chatError` states change, it re-renders to display the incoming message, status, or errors.
    *   It uses `@uiw/react-markdown-preview` to render the Markdown content.

### 3.3. Environment Variable Management (`src/env.ts`)

The project uses `@t3-oss/env-core` and Zod to provide compile-time and runtime validation of environment variables.

*   **Client-Side Variables**: Enforces that all client-side variables exposed to Vite must be prefixed with `VITE_`.
*   **Validation**: Defines a Zod schema (`client`) to ensure that variables like `VITE_BACKEND_HOST` are present and are valid URLs.
*   **Type Safety**: This setup provides full type safety for `import.meta.env`, preventing runtime errors caused by missing or misconfigured environment variables.
