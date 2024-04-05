import { apiHandler } from "./index.api";

export type getEventParams = {
    page: number;
    limit: number;
  }

export const getEventApi = (params: getEventParams) => apiHandler.get(`/event/active?page=${params.page}&limit=${params.limit}`);

export const getEventDetailApi = (id: number, token: string) => apiHandler.get(`/event/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})