import { Instance, SnapshotOut, types } from "mobx-state-tree"

type productType = {
    id: number
    name: "Course" | "Event" | "Consultation"
}
export const WishlistModel = types.model("Wishlist").props({
    id: types.integer,
    name: types.string,
    price: types.number,
    imageUrl: types.optional(types.string, ""),
    productType: types.frozen<productType>()
});

export interface Wishlist extends Instance<typeof WishlistModel> {}
export interface WishlistSnapshot extends SnapshotOut<typeof WishlistModel> {}
