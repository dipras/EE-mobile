import { apiHandler } from "./index.api";

export type getCourseApiParams = {
    page: number;
    limit: number;
  }

export const getCourseApi = (params: getCourseApiParams) => apiHandler.get(`/course/active?page=${params.page}&limit=${params.limit}`);

export const getCourseDetailApi = (id: number) => apiHandler.get(`/course/${id}`);