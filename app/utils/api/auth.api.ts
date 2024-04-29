import { apiHandler } from "./index.api"

type token = string | undefined
type loginData = {
  email: string
  password: string
}

type registerData = {
  email: string
  password: string
  name: string
}

export type updateUserData = {
  name: string
  dateOfBirth: string
  gender: number
  phoneNumber: string
  domicile: string
  nik: string
  npwp: string
}

export const loginApi = (data: loginData) => {
  return apiHandler.post("/auth/login", data)
}

export const registerApi = (data: registerData) => {
  return apiHandler.post("/auth/register", data)
}

export const meApi = (token: token) => {
  return apiHandler.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const updateUserApi = (token: token, data: updateUserData) => {
  return apiHandler.patch("/user/update", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const resetPasswordApi = (token: token, password: string) => {
  return apiHandler.patch(
    `/user/change-password`,
    {
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}

export const verifyGoogle = (token: token) => {
  return apiHandler.post("/auth/google/verify", {
    idToken: token,
  })
}
