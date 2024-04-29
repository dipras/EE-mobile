import { Instance, SnapshotOut, types } from "mobx-state-tree"

type productType = {
    id: number
    name: "Course" | "Event"
}
export const CartModel = types.model("Cart").props({
    id: types.integer,
    name: types.string,
    price: types.number,
    imageUrl: types.optional(types.string, ""),
    productType: types.frozen<productType>()
});

export interface Cart extends Instance<typeof CartModel> {}
export interface CartSnapshot extends SnapshotOut<typeof CartModel> {}
