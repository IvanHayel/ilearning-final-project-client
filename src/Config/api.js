import axios  from "axios";
import {
  API_BASE_URL,
  AUTH_API,
  HEADER_CONTENT_TYPE,
  HTTP_STATUS,
  TOKEN_HEADER_NAME,
}             from "../Constants";
import {
  ejectUser,
  getLocalAccessToken,
  isAuthenticated,
  refreshToken,
}             from "../Services";
import stores from "../Stores";

const {themeStore} = stores;

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": HEADER_CONTENT_TYPE.JSON,
  },
});

api.interceptors.request.use(
    (config) => {
      const token = getLocalAccessToken();
      if (token) {
        config.headers[TOKEN_HEADER_NAME] = token;
        config.headers["Accept-Language"] = themeStore.getLanguage();
      }
      return Promise.resolve(config);
    },
    (error) => {
      return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => Promise.resolve(response),
    async (error) => {
      const originalConfig = error.config;
      if (originalConfig.url !== AUTH_API.SIGN_IN && error.response) {
        if (isAuthenticated() &&
            error.response.status === HTTP_STATUS.UNAUTHORIZED &&
            !originalConfig._retry) {
          return tryRefreshToken(originalConfig);
        }
        if (isAuthenticated() &&
            error.response.status === HTTP_STATUS.FORBIDDEN &&
            !originalConfig._retry) {
          return tryEjectUser(originalConfig);
        }
      }
      return Promise.reject(error);
    }
);

const tryRefreshToken = async (originalConfig) => {
  try {
    await refreshToken();
    originalConfig._retry = true;
    return api(originalConfig);
  } catch (_error) {
    return Promise.reject(_error);
  }
};

const tryEjectUser = async (originalConfig) => {
  try {
    await ejectUser(originalConfig);
    originalConfig._retry = true;
    return api;
  } catch (_error) {
    return Promise.reject(_error);
  }
}
