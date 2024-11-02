export interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;

  login: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<void>;

  register: (
    email: string,
    password: string,
    username: string
  ) => Promise<void>;

  logout: () => Promise<void>;
  isLoading: boolean;
}

export interface UserType {
  _id: string;
  username: string;
  email: string;
  chats: string[];
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface AuthState {
  user: UserType | null;
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
}

export enum AuthActionTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SET_USER = "SET_USER",
  SET_LOADING = "SET_LOADING",
  REGISTRATION = "REGISTRATION",
}

export type AuthAction =
  | { type: AuthActionTypes.LOGIN; payload: { token: string } }
  | { type: AuthActionTypes.LOGOUT }
  | { type: AuthActionTypes.SET_USER; payload: { user: UserType } }
  | { type: AuthActionTypes.SET_LOADING; payload: { isLoading: boolean } }
  | { type: AuthActionTypes.REGISTRATION };
