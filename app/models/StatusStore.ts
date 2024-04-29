import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const StatusStoreModel = types
  .model("StatusStore")
  .props({
    firstTime: true,
    redirect: "",
    redirectParams: types.frozen(),
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
    setFirstTime() {
      store.firstTime = true
    },
    setRedirect(redirect: string, redirectParams: any) {
      store.redirectParams = redirectParams
      store.redirect = redirect
    },
    removeRedirect() {
      store.redirectParams = {}
      store.redirect = ""
    },
  }))

export interface StatusStore extends Instance<typeof StatusStoreModel> {}
export interface StatusStoreSnapshot extends SnapshotOut<typeof StatusStoreModel> {}
