import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Cart, CartModel } from "./Cart"

export const CartStoreModel = types.model("CartStore").props({
    cartData: types.array(CartModel),
}).views((store) => ({
    get cartList() {
        return store.cartData;
    }
})).actions((store) => ({
    addCart(cart: Cart) {
        store.cartData.push(cart)
    },
    getCartById(id: number) {
        return store.cartData.filter(cart => cart.id == id)[0];
    },
    removeCartById(id: number) {
        const removed = this.getCartById(id);
        store.cartData.remove(removed);
    }
}))

export interface CartStore extends Instance<typeof CartStoreModel> {}
export interface CartStoreSnapshot extends SnapshotOut<typeof CartStoreModel> {}
