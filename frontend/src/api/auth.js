import apiClient from "./apiClient";

export const login = (email, password) =>
    apiClient("/auth/login", "POST", { email, password });

export const logout = () =>
    apiClient("/auth/logout", "POST");