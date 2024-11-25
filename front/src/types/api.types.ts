export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface GetMeResponse {
  _id: string;
  username: string;
  email: string;
  chats: string[];
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface StartChatResponse {
  message: string;
  sessionId: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface ChatHistory {
  _id: string;
  user: string;
  messages: ChatMessage[];
  chat_session_id: string;
  chef_name: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface UserChats {
  chats: ChatHistory[];
}
