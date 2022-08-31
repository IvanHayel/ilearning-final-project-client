import {api}        from "../Config";
import {SEARCH_API} from "../Constants";
import stores       from "../Stores";

const {collectionStore} = stores;

export const searchGlobal = async (searchTerm) => {
  try {
    const response = await api.post(SEARCH_API.GLOBAL, {
      searchTerm: searchTerm
    });
    const {collections, items} = response.data;
    collectionStore.clearSearch();
    collectionStore.setSearchCollections(collections);
    collectionStore.setSearchItems(items);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const searchCollections = async (searchTerm) => {
  try {
    const response = await api.post(SEARCH_API.COLLECTIONS, {
      searchTerm: searchTerm
    });
    collectionStore.clearSearch();
    collectionStore.setSearchCollections(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const searchItems = async (searchTerm) => {
  try {
    const response = await api.post(SEARCH_API.ITEMS, {
      searchTerm: searchTerm
    });
    collectionStore.clearSearch();
    collectionStore.setSearchItems(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const searchCollectionsByTheme = async (theme) => {
  try {
    const response = await api.post(SEARCH_API.COLLECTIONS_BY_THEME, {
      searchTerm: theme
    });
    collectionStore.clearSearch();
    collectionStore.setSearchCollections(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const searchItemsByTag = async (tag) => {
  try {
    const response = await api.post(SEARCH_API.ITEMS_BY_TAG, {
      searchTerm: tag
    });
    collectionStore.clearSearch();
    collectionStore.setSearchItems(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};
