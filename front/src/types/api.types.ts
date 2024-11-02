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
