import {makeAutoObservable} from "mobx";
import {ROLE}               from "../Constants";

export default class UserStore {
  users = [];
  selectedUserIds = new Set();

  constructor() {
    makeAutoObservable(this);
  }

  setUsers(users) {
    this.users = users.map((user) => {
      user.createDate = new Date(user.createDate).toLocaleString();
      user.updateDate = new Date(user.updateDate).toLocaleString();
      user.lastLogin = new Date(user.lastLogin).toLocaleString();
      return user;
    });
  }

  getUsers() {
    return [
      ...this.users.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        createDate: user.createDate,
        updateDate: user.updateDate,
        lastLogin: user.lastLogin,
        active: user.active,
        blocked: user.blocked,
        roles: user.roles.map((role) => role.name.substring(5)).join(", "),
      })),
    ];
  }

  getSelectedUsers() {
    return this.users.filter((user) => this.selectedUserIds.has(user.id));
  }

  setSelectedUserIds(ids) {
    this.selectedUserIds = new Set(ids);
  }

  isAdmin(id) {
    return this.users.find((user) => user.id === id)
    .roles.some((role) => role.name === ROLE.ADMIN);
  }

  clearStore() {
    this.users = [];
  }
}
