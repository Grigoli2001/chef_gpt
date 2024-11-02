import api from "../hooks/axios";

export interface IUserPreferences {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  healthy: boolean;
  likes: string[];
  dislikes: string[];
  created_at?: Date;
  updated_at?: Date;
}

export const getPreferences = async (): Promise<IUserPreferences> => {
  const response = await api.get(`/user/userPreferences`);
  return response.data;
};
export const updatePreferences = async (
  preferences: IUserPreferences
): Promise<Response> => {
  const response = await api.post(`/user/userPreferences`, preferences);
  return response.data;
};

export const setPreferences = async (
  preferences: IUserPreferences
): Promise<Response> => {
  const response = await api.post(`/user/userPreferences`, {
    preferences: preferences,
  });
  return response.data;
};

export const deletePreferences = async (): Promise<Response> => {
  const response = await api.delete(`/user/userPreferences`);
  return response.data;
};
