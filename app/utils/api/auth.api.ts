import { apiHandler } from "./index.api";

type token = string | undefined;
type loginData = {
    email: string;
    password: string;
}
export type updateUserData = {
    name: string
    dateOfBirth: string
    gender: number
    phoneNumber: string
    domicile:string
}


export const loginApi = (data: loginData) => {
    return apiHandler.post("/auth/login", data);
}

export const meApi = (token: token) => {
    return apiHandler.get("/auth/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const updateUserApi = (token: token, data: updateUserData) => {
    return apiHandler.patch("/user/update", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}