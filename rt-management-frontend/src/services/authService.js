import api from "@/api/axios";

export const login = (payload) =>
    api.post("/login", payload);

export const logout = () =>
    api.post("/logout");

export const me = () =>
    api.get("/me");