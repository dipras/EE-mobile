import { apiHandler } from "./index.api"

export type getEventParams = {
  page: number
  limit: number
}

export const getEventApi = (params: getEventParams) =>
  apiHandler.get(`/event/active?page=${params.page}&limit=${params.limit}`)

export type eventDetailResponse = {
  name: string
  desc: string
  event_image: { image: string }[]
  product_type: { id: number; name: string }
  price: number
  discount: number
  sale_price: number
}

export const eventDetailSample: eventDetailResponse = {
  name: "Event Name",
  desc: "Event Description",
  event_image: [
    { image: "https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png" },
  ],
  product_type: {
    id: 1,
    name: "Product Type",
  },
  price: 1000,
  sale_price: 1100,
  discount: 0,
}

export const getEventDetailApi = (id: number, token: string) =>
  apiHandler.get(`/event/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
