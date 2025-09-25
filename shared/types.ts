export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number;
}
export interface Grant {
  id: string;
  title: string;
  funder: string;
  description: string;
  amount: number;
  deadline: string; // ISO 8601 format
  url: string;
  category: string;
}