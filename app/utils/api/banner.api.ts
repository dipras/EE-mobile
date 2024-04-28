import { apiHandler } from "./index.api";

export const getActiveBanner = () => apiHandler.get("/banner/active");