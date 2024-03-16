import axios from "axios";

export const apiHandler = axios.create({
    baseURL: "https://be.exportexpert.id"
});