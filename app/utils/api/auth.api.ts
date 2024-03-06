import { apiHandler } from "./index.api";

type loginData = {
    email: string;
    password: string;
}

export const loginApi = (data: loginData) => {
    return apiHandler.post("/auth/login", data);
}