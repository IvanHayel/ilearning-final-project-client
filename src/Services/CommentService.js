import {t}    from "i18next";
import {
  toast
}             from "react-toastify";
import SockJS from 'sockjs-client';
import {
  over
}             from 'stompjs';
import {
  api
}             from "../Config";
import {
  BASIC_TOAST_OPTIONS,
  CONTENT,
  SOCKET,
  TOKEN_HEADER_NAME,
  USER_API
}             from "../Constants";
import stores from "../Stores";
import {
  getLocalAccessToken,
  isAuthenticated
}             from "./AuthenticationService";

const {authenticationStore, commentStore} = stores;

const subscriptions = new Map();

let stompClient = null;
const stompDebugEnabled = process.env.REACT_APP_API_SOCKET_DEBUG_ENABLED;

let socketConnectedStatus = false;

const verifyTokenNotExpired = () => {
  api.get(USER_API.VERIFY_TOKEN).catch(error => error);
};

export const connectToSocket = () => {
  if (!stompClient && isAuthenticated()) {
    verifyTokenNotExpired();
    const socket = new SockJS(SOCKET.CONNECT);
    stompClient = over(socket);
    stompClient.debug = stompDebugEnabled ? stompClient.debug : null;
    stompClient.connect({
      [TOKEN_HEADER_NAME]: getLocalAccessToken()
    }, onSocketConnected, onSocketConnectionError);
    return true;
  }
  return false;
};

export const disconnectFromSocket = () => {
  if (stompClient) {
    stompClient.disconnect();
    stompClient = null;
    socketConnectedStatus = false;
    subscriptions.clear();
  }
};

export const isSocketConnected = () => socketConnectedStatus;

const onSocketConnected = () => {
  socketConnectedStatus = true;
  const username = authenticationStore.getCurrentUserName();
  const personal = `${SOCKET.PREFIX.USER}${username}${SOCKET.POSTFIX.PRIVATE}`;
  stompClient.subscribe(personal, onCommentOwnCollection);
};

const onSocketConnectionError = () => {
  disconnectFromSocket();
  if (isAuthenticated()) {
    console.log(SOCKET.RECONNECTING.MESSAGE);
    setTimeout(() => connectToSocket(), SOCKET.RECONNECTING.TIMEOUT);
  }
};

export const socketSubscribeItem = (itemId) => {
  if (stompClient && !subscriptions.has(itemId)) {
    const uri = SOCKET.COMMENT.concat(itemId);
    const subscription = stompClient.subscribe(uri, onItemComment);
    subscriptions.set(itemId, subscription);
    return uri;
  }
};

const onItemComment = (message) => {
  const comment = JSON.parse(message.body);
  commentStore.addComment(comment);
};

export const socketUnsubscribeItem = (itemId) => {
  if (stompClient && subscriptions.has(itemId)) {
    subscriptions.get(itemId).unsubscribe();
    subscriptions.delete(itemId);
  }
};

const onCommentOwnCollection = (message) => {
  const comment = JSON.parse(message.body);
  if (comment.author.username !== authenticationStore.getCurrentUserName()) {
    const notification = `${t(CONTENT.TOAST.USER)} ${comment.author.username} 
    ${t(CONTENT.TOAST.LEAVE_COMMENT)} ${comment.item.name}`;
    toast.info(notification, BASIC_TOAST_OPTIONS);
  }
};

export const leaveComment = (itemId, comment) => {
  if (stompClient) {
    verifyTokenNotExpired();
    const uri = `${SOCKET.SEND.COMMENT}${itemId}`;
    stompClient.send(uri, {}, JSON.stringify(comment));
  }
};

