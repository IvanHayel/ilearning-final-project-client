import {t}                                       from "i18next";
import {toast}                                   from "react-toastify";
import {api}                                     from "../Config";
import {AUTH_API, BASIC_TOAST_OPTIONS, CONTENT,} from "../Constants";
import stores                                    from "../Stores";
import {createErrorMessage}                      from "../Utils";
import {connectToSocket, disconnectFromSocket}   from "./CommentService";

const {authenticationStore, rootStore} = stores;

export const signUp = async (body) => {
  try {
    return await toast.promise(
        api.post(AUTH_API.SIGN_UP, body),
        {
          pending: t(CONTENT.TOAST.PENDING),
          success: t(CONTENT.TOAST.SIGN_UP_SUCCESS),
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS
    );
  } catch (error) {
    return error.response;
  }
};

export const signIn = async (body) => {
  try {
    const response = await toast.promise(
        api.post(AUTH_API.SIGN_IN, body),
        {
          pending: t(CONTENT.TOAST.PENDING),
          success: t(CONTENT.TOAST.SIGN_IN_SUCCESS),
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS
    );
    authenticationStore.authenticate(response.data);
    connectToSocket();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const signInOAuth2 = async (token) => {
  try {
    const response = await toast.promise(
        api.post(AUTH_API.OAUTH2.SIGN_IN, token),
        {
          pending: t(CONTENT.TOAST.PENDING),
          success: t(CONTENT.TOAST.SIGN_IN_SUCCESS),
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS
    );
    authenticationStore.authenticate(response.data);
    connectToSocket();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const signOut = async (message) => {
  try {
    const successMessage = message || t(CONTENT.TOAST.SIGN_OUT_SUCCESS);
    const currentUserId = authenticationStore.getCurrentUserId();
    const url = `${AUTH_API.SIGN_OUT}${currentUserId}`;
    return await toast.promise(
        api.patch(url),
        {
          pending: t(CONTENT.TOAST.PENDING),
          success: successMessage,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS
    );
  } catch (error) {
    return error.response;
  } finally {
    rootStore.clearStores();
    disconnectFromSocket();
  }
};

export const refreshToken = async () => {
  try {
    const body = authenticationStore.getLocalRefreshToken();
    const response = await toast.promise(
        api.post(AUTH_API.REFRESH_TOKEN, body),
        {
          pending: t(CONTENT.TOAST.PENDING),
          success: t(CONTENT.TOAST.TOKEN_REFRESH_SUCCESS),
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS
    );
    authenticationStore.refreshTokens(response.data);
    return response;
  } catch (error) {
    if (isAuthenticated()) {
      await signOut(t(CONTENT.TOAST.SESSION_EXPIRED));
    }
    return error.response;
  }
};

export const ejectUser = async () => {
  const message = t(CONTENT.TOAST.EJECT_USER_SUCCESS);
  return signOut(message);
}

export const getLocalAccessToken = () => {
  return authenticationStore.getLocalAccessToken();
};

export const isCurrentUser = (id, username) => {
  const currentUser = authenticationStore.getCurrentUser();
  return currentUser.id === id && currentUser.username === username;
}

export const isAuthenticated = () => {
  return authenticationStore.isAuthenticated();
};

export const isAdmin = () => {
  return authenticationStore.isAdmin();
};

export const isRoot = () => {
  return authenticationStore.isRoot();
};

export const isEnoughRights = (id, username) => {
  return isAuthenticated()
      && (isCurrentUser(id, username) || isAdmin() || isRoot());
}
