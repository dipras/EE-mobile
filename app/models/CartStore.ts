import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Cart, CartModel } from "./Cart"

export const CartStoreModel = types
  .model("CartStore")
  .props({
    cartData: types.array(CartModel),
  })
  .views((store) => ({
    get cartList() {
      return store.cartData
    },
  }))
  .actions((store) => ({
    addCart(cart: Cart) {
      const item = this.getCartById(cart.id, cart.productType.name)
      if (!item) {
        store.cartData.push(cart)
      }
    },
    getCartById(id: number, type: "Course" | "Event") {
      return store.cartData.filter((cart) => cart.id === id && cart.productType.name === type)[0]
    },
    removeCartById(id: number, type: "Course" | "Event") {
      const removed = this.getCartById(id, type)
      store.cartData.remove(removed)
    },
  }))

export interface CartStore extends Instance<typeof CartStoreModel> {}
export interface CartStoreSnapshot extends SnapshotOut<typeof CartStoreModel> {}
