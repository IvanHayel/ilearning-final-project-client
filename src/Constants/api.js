export const API_HOME = process.env.REACT_APP_API;
export const API_BASE_URL = `${API_HOME}/api`;

export const API_OAUTH2_QUERY_PARAM = process.env.REACT_APP_API_OAUTH2_QUERY_PARAM;

export const AUTH_API = {
  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  SIGN_OUT: "/auth/sign-out/",
  REFRESH_TOKEN: "/auth/refresh-token",
  OAUTH2: {
    SIGN_IN: "/auth/oauth2-sign-in",
    GITHUB: `${API_HOME}/oauth2/authorization/github`
  }
};

export const USER_API = {
  USERS: "/users",
  BLOCK_USER: "/users/block/",
  UNBLOCK_USER: "/users/unblock/",
  GRANT_ADMIN_RIGHTS: "/users/grant-admin-rights/",
  REVOKE_ADMIN_RIGHTS: "/users/revoke-admin-rights/",
  VERIFY_TOKEN: "/users/verify-token",
};

export const COLLECTIONS_API = {
  COLLECTIONS: "/collections",
  COLLECTIONS_OWN: "/collections/own/list",
  TOP_COLLECTIONS: "/collections/top/",
  TAGS: "/collections/tags",
  TAGS_FOR_CLOUD: "/collections/tags-for-cloud",
  THEMES: "/collections/themes",
  STATISTICS: "/collections/statistics",
};

export const SEARCH_API = {
  GLOBAL: "/search",
  COLLECTIONS: "/search/collections",
  COLLECTIONS_BY_THEME: "/search/themes",
  ITEMS: "/search/items",
  ITEMS_BY_TAG: "/search/tags",
};

export const SEARCH_SCOPE = {
  GLOBAL: "global",
  COLLECTIONS: "collections",
  COLLECTIONS_BY_THEME: "theme",
  ITEMS: "items",
  ITEMS_BY_TAG: "tag",
};

export const SORT_DIRECTION = {
  PARAMETER: "direction",
  DEFAULT: "DEFAULT",
  ASC: "ASC",
  DESC: "DESC",
};

export const SORT_STRATEGY = {
  PARAMETER: "strategy",
  DEFAULT: "DEFAULT",
  CREATE_DATE: "CREATE_DATE",
  UPDATE_DATE: "UPDATE_DATE",
  NAME: "NAME",
};
