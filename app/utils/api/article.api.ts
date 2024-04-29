import axios from "axios"
const base = "https://be-dev.exportexpert.id"

export type articleApiParams = {
  page?: number
  limit?: number
  sortBy?: "ASC" | "DESC"
}

export type getArticleApiResponse = {
  id: number
  article_category: {
    id: number
    name: string
  }
  title: string
  description: string
  image: string
  url: string
}

export const getPodcastApiSample: getArticleApiResponse[] = [
  {
    id: 0,
    article_category: {
      id: 0,
      name: "Article Category",
    },
    title: "Video Sample",
    description: "Video Description",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png",
    url: "https://www.youtube.com/watch?v=wDchsz8nmbo",
  },
]

export const getPodcasApi = (params: articleApiParams = { page: 1, limit: 4, sortBy: "DESC" }) =>
  axios.get(
    `${base}/article/category/podcast?page=${params.page}&limit=${params.limit}&sortBy=createdAt:${params.sortBy}`,
  )
