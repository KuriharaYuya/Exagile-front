const DEFAULT_API_LOCALHOST = "http://localhost:3001/api/v1";

export const signup = `${DEFAULT_API_LOCALHOST}/signup`;
export const login = `${DEFAULT_API_LOCALHOST}/login`;
export const sessionCheck = `${DEFAULT_API_LOCALHOST}/sessions/check`;
export const logout = `${DEFAULT_API_LOCALHOST}/logout`;
export const calenderIndex = `${DEFAULT_API_LOCALHOST}/appoints`;
export const appointDetail = (id: string) => {
  return `${DEFAULT_API_LOCALHOST}/appoints/${id}`;
};
