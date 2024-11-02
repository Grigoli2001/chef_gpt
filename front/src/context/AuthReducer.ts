import { AuthState, AuthActionTypes, AuthAction } from "../types/auth.types";

export const initialState: AuthState = {
  user: null,
  isAuthenticated:
    !!localStorage.getItem("accessToken") ||
    !!sessionStorage.getItem("accessToken"),
  token:
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken"),
  isLoading: true,
};

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        isLoading: false,
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
      };
    case AuthActionTypes.REGISTRATION:
      return {
        ...state,
      };
    case AuthActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        isAuthenticated: true,
      };
    case AuthActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    default:
      return state;
  }
};
