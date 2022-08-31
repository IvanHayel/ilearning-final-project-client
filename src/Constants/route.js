import {API_OAUTH2_QUERY_PARAM} from "./api";

export const ROUTE_URL = {
  HOME: "/",
  PROFILE: "/profile",
  ABOUT: "/about",
  SEARCH: "/search",
  ADMIN: {
    BOARD: "/admin-board",
  },
  COLLECTIONS: {
    GLOBAL: "/collections",
    OWN: "/own-collections",
    COLLECTION: "/collections/:name",
    ITEM: "/collections/:name/items/:item",
  },
  WHOOPS: {
    NOT_FOUND: "/whoops/not-found",
  },
  OAUTH2: "/redirect/oauth2"
};

export const ROUTE_PARAMETER = {
  SEARCH: {
    TERM: "term",
    SCOPE: "scope",
  },
  OAUTH2: {
    TOKEN: API_OAUTH2_QUERY_PARAM,
  },
};
