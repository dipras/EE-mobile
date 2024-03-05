import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const StatusStoreModel = types
  .model("StatusStore")
  .props({
    firstTime: true,
  })
  .views((store) => ({
    get isFirstTime() {
      return store.firstTime
    },
  }))
  .actions((store) => ({
    setSecondTime() {
      store.firstTime = false
    },
  }))

export interface StatusStore extends Instance<typeof StatusStoreModel> {}
export interface StatusStoreSnapshot extends SnapshotOut<typeof StatusStoreModel> {}
