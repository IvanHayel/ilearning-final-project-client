import AuthenticationStore from "./AuthenticationStore";
import CollectionStore     from "./CollectionStore";
import CommentStore        from "./CommentStore";
import ThemeStore          from "./ThemeStore";
import UserStore           from "./UserStore";

export default class RootStore {
  constructor() {
    this.authenticationStore = new AuthenticationStore(this);
    this.userStore = new UserStore(this);
    this.themeStore = new ThemeStore(this);
    this.collectionStore = new CollectionStore(this);
    this.commentStore = new CommentStore(this);
  }

  clearStores() {
    this.authenticationStore.clearStore();
    this.userStore.clearStore();
    this.collectionStore.clearStore();
    this.commentStore.clearStore();
  }
}
