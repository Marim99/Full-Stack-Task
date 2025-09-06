import api from "./api";

export const login = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

export const register = (email: string,name:string, password: string) =>
  api.post("/auth/register", { email,name, password });