import { apiHandler } from "./index.api";

export type getExpertsApiParams = {
    page: number;
    limit: number;
  }

export const getExpertsApi = (params: getExpertsApiParams) => {
    return apiHandler.get(`/expert/active?page=${params.page}&limit=${params.limit}`)
}

export const getExpertDetailApi = (id: number) => {
  return apiHandler.get(`/expert/${id}`);
}