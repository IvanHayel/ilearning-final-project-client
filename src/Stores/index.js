import {configure} from "mobx";
import RootStore   from "./RootStore";

configure({
  enforceActions: "never",
});

const rootStore = new RootStore();

const stores = {
  rootStore,
  authenticationStore: rootStore.authenticationStore,
  userStore: rootStore.userStore,
  themeStore: rootStore.themeStore,
  collectionStore: rootStore.collectionStore,
  commentStore: rootStore.commentStore,
};

export default stores;
