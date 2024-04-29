import { apiHandler } from "./index.api"

export type checkoutParams = {
  product_type_id: number
  product_id: number
  first_name?: string
  last_name?: string
  phone_number?: string
  email?: string
}
export const checkoutApi = (authKey: any, params: checkoutParams) =>
  apiHandler.post("/order/checkout", params, {
    headers: {
      Authorization: `Bearer ${authKey}`,
    },
  })

export const getPurchaseHistory = (authKey: any) =>
  apiHandler.get(`/order-detail/purchase-history`, {
    headers: {
      Authorization: `Bearer ${authKey}`,
    },
  })
