import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Cart, CartModel } from "./Cart"

export const WishlistStoreModel = types.model("WishlistStore").props({
    wishlistData: types.array(CartModel)
}).actions(store => ({
    addWishlist(product: Cart) {
        store.wishlistData.push(product);
    },
    getWishlistById(id: number) {
        return store.wishlistData.filter(cart => cart.id == id)[0];
    },
    removeWishlistById(id: number) {
        const removed = this.getWishlistById(id);
        store.wishlistData.remove(removed);
    }
}))

export interface WishlistStore extends Instance<typeof WishlistStoreModel> {}
export interface WishlistStoreSnapshot extends SnapshotOut<typeof WishlistStoreModel> {}