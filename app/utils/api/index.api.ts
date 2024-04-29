import axios from "axios"

export const apiHandler = axios.create({
  baseURL: "https://dev-be.exportexpert.id",
})
