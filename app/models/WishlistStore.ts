import { Instance, SnapshotOut, types } from "mobx-state-tree"
import {WishlistModel, Wishlist} from "./Wishlist";

type product_type = "Course" | "Event" | "Consultation";

export const WishlistStoreModel = types.model("WishlistStore").props({
    wishlistData: types.array(WishlistModel)
}).actions(store => ({
    addWishlist(product: Wishlist) {
        store.wishlistData.push(product);
    },
    getWishlistById(id: number, type: product_type = "Course") {
        return store.wishlistData.filter(wishlist => wishlist.id == id && wishlist.productType.name == type)[0];
    },
    removeWishlistById(id: number, type: product_type = "Course") {
        const removed = this.getWishlistById(id, type);
        store.wishlistData.remove(removed);
    },
    resetWishlist() {
        store.wishlistData.clear()
    }
}))

export interface WishlistStore extends Instance<typeof WishlistStoreModel> {}
export interface WishlistStoreSnapshot extends SnapshotOut<typeof WishlistStoreModel> {}