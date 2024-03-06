import axios from "axios";

export const apiHandler = axios.create({
    baseURL: "https://be-dev.exportexpert.id"
});