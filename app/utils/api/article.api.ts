import axios from "axios"
const base = "https://be-dev.exportexpert.id"

export const getPodcasApi = (authToken: any) =>
  axios.get(`${base}/article/category/podcast?page=1&limit=4`, {
    headers: {
      Authorization: `bearer ${authToken}`,
    },
  })
