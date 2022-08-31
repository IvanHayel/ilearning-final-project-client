import {API_HOME} from "./api";

export const SOCKET = {
  CONNECT: `${API_HOME}/ws`,
  COMMENT: "/comment/items/",
  PREFIX: {
    USER: "/user/"
  },
  POSTFIX: {
    PRIVATE: "/private"
  },
  RECONNECTING: {
    MESSAGE: "Reconnecting in 10 seconds...",
    TIMEOUT: 10000
  },
  SEND: {
    COMMENT: "/app/comment/",
  }
};