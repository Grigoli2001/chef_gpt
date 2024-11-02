import api from "../hooks/axios";
import {
  LoginResponse,
  GetMeResponse,
  RefreshTokenResponse,
} from "../types/api.types";

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post(`/auth/signin`, {
    email,
    password,
  });
  return response.data;
};

export const signup = async (
  email: string,
  password: string,
  username: string
): Promise<Response> => {
  const response = await api.post(`/auth/signup`, {
    username,
    email,
    password,
  });
  return response.data;
};

export const logout = async (): Promise<void> => {
  const response = await api.get(`/auth/signout`);
  return response.data;
};

export const getMe = async (): Promise<GetMeResponse> => {
  const response = await api.get(`/auth/user`);
  return response.data;
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const response = await api.get(`/auth/refresh`);
  return response.data;
};
