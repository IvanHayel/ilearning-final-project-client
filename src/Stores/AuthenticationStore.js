import {makeAutoObservable} from "mobx";
import {makePersistable}    from "mobx-persist-store";
import {ROLE}               from "../Constants";

export default class AuthenticationStore {
  status = null;
  token = {
    type: null,
    access: null,
    refresh: null,
  };
  user = {
    id: null,
    email: null,
    username: null,
    roles: [],
  };

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "AuthenticationStore",
      properties: ["status", "token", "user"],
      storage: localStorage,
    }).catch((error) =>
        console.log("Unable to persist authentication store:", error)
    );
  }

  authenticate({id, email, username, roles, token, refreshToken, tokenType}) {
    this.user.id = id;
    this.user.email = email;
    this.user.username = username;
    this.user.roles = roles;
    this.token.type = tokenType;
    this.token.access = token;
    this.token.refresh = refreshToken;
    this.status = true;
  }

  refreshTokens({accessToken, tokenType, refreshToken}) {
    this.token.type = tokenType;
    this.token.access = accessToken;
    this.token.refresh = refreshToken;
  }

  getCurrentUser() {
    return {...this.user};
  }

  getCurrentUserId() {
    return this.user.id;
  }

  getCurrentUserName() {
    return this.user.username;
  }

  getLocalAccessToken() {
    return `${this.token.type} ${this.token.access}`;
  }

  getLocalRefreshToken() {
    return {refreshToken: this.token.refresh};
  }

  clearStore() {
    this.user.id = null;
    this.user.email = null;
    this.user.username = null;
    this.user.roles = [];
    this.token.type = null;
    this.token.access = null;
    this.token.refresh = null;
    this.status = false;
  }

  isAuthenticated() {
    return this.status;
  }

  isAdmin() {
    return this.user.roles.includes(ROLE.ADMIN);
  }

  isRoot() {
    return this.user.roles.includes(ROLE.ROOT);
  }
}
