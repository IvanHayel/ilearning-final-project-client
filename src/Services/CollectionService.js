import {t}                  from "i18next";
import {toast}              from "react-toastify";
import {api}                from "../Config";
import {
  BASIC_TOAST_OPTIONS,
  COLLECTIONS_API,
  CONTENT,
  CONTENT_TYPE,
  SORT_DIRECTION,
  SORT_STRATEGY
}                           from "../Constants";
import stores               from "../Stores";
import {createErrorMessage} from "../Utils";
import {getImageObjectUrl}  from "./ImageService";

const {collectionStore, commentStore} = stores;

const buildSortUrl = (baseUrl, direction, strategy) => {
  const parameters = new URLSearchParams();
  parameters.append(SORT_DIRECTION.PARAMETER, direction);
  parameters.append(SORT_STRATEGY.PARAMETER, strategy);
  return `${baseUrl}?${parameters}`;
};

export const getCollections = async (direction, strategy) => {
  try {
    const url = buildSortUrl(COLLECTIONS_API.COLLECTIONS, direction, strategy);
    const response = await api.get(url);
    collectionStore.setCollections(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getOwnCollections = async (direction, strategy) => {
  try {
    const url =
        buildSortUrl(COLLECTIONS_API.COLLECTIONS_OWN, direction, strategy);
    const response = await api.get(url);
    collectionStore.setOwnCollections(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getTopCollections = async (count) => {
  try {
    const url = `${COLLECTIONS_API.TOP_COLLECTIONS}${count}`;
    const response = await api.get(url);
    collectionStore.setTopCollections(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getCollectionItems = async (name, direction, strategy) => {
  try {
    const baseUrl = `${COLLECTIONS_API.COLLECTIONS}/${name}/items`;
    const url = buildSortUrl(baseUrl, direction, strategy);
    const response = await api.get(url);
    collectionStore.setItems(response.data)
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getCollectionItem = async (name, itemId) => {
  try {
    const url = `${COLLECTIONS_API.COLLECTIONS}/${name}/items/${itemId}`;
    const response = await api.get(url);
    const item = response.data;
    item.imageLink = await getImageObjectUrl(response.data.imageLink);
    commentStore.setComments(item.comments);
    collectionStore.setItem(item);
    return item;
  } catch (error) {
    throw error;
  }
};

export const getTags = async () => {
  try {
    const response = await api.get(COLLECTIONS_API.TAGS);
    collectionStore.setTags(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getTagsForCloud = async () => {
  try {
    const response = await api.get(COLLECTIONS_API.TAGS_FOR_CLOUD);
    collectionStore.setTagsForCloud(response.data.tags);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getThemes = async () => {
  try {
    const response = await api.get(COLLECTIONS_API.THEMES);
    collectionStore.setThemes(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getCollection = async (name) => {
  try {
    const url = `${COLLECTIONS_API.COLLECTIONS}/${name}`;
    const response = await api.get(url);
    collectionStore.setCollection(response.data);
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const getStatistics = async () => {
  try {
    const response = await api.get(COLLECTIONS_API.STATISTICS);
    collectionStore.setStatistics(response.data);
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const createCollection = async (collection) => {
  try {
    return await toast.promise(
        api.post(COLLECTIONS_API.COLLECTIONS, collection), {
          pending: t(CONTENT.TOAST.PENDING),
          success: t(CONTENT.TOAST.CREATE_COLLECTION_SUCCESS),
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
    await getOwnCollections();
  }
};

export const deleteCollection = async (id, name) => {
  try {
    const url = `${COLLECTIONS_API.COLLECTIONS}/${id}`;
    return await toast.promise(
        api.delete(url), {
          pending: t(CONTENT.TOAST.PENDING),
          success: t(CONTENT.TOAST.DELETE_COLLECTION_SUCCESS) + name,
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
    await getCollections();
    await getOwnCollections();
  }
};

export const editCollection = async (collection) => {
  try {
    return await toast.promise(
        api.put(COLLECTIONS_API.COLLECTIONS, collection), {
          pending: t(CONTENT.TOAST.PENDING),
          success: t(CONTENT.TOAST.EDIT_COLLECTION_SUCCESS) + collection.name,
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
    await getCollections();
    await getOwnCollections();
  }
}

export const addItemToCollection = async (name, item) => {
  const url = `${COLLECTIONS_API.COLLECTIONS}/${name}/items`;
  try {
    return await toast.promise(
        api.post(url, item), {
          pending: t(CONTENT.TOAST.PENDING),
          success: t(CONTENT.TOAST.ADD_ITEM_SUCCESS),
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

export const updateCollectionItem = async (name, item) => {
  const url = `${COLLECTIONS_API.COLLECTIONS}/${name}/items/${item.id}`;
  try {
    return await toast.promise(
        api.put(url, item), {
          pending: t(CONTENT.TOAST.PENDING),
          success: t(CONTENT.TOAST.UPDATE_ITEM_SUCCESS),
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

export const likeItem = async (name, item) => {
  const url = `${COLLECTIONS_API.COLLECTIONS}/${name}/items/${item.id}`;
  try {
    return await api.patch(url);
  } catch (error) {
    return error.response;
  }
};

export const deleteItemFromCollection = async (name, item) => {
  const url = `${COLLECTIONS_API.COLLECTIONS}/${name}/items/${item.id}`;
  try {
    return await toast.promise(
        api.delete(url), {
          pending: t(CONTENT.TOAST.PENDING),
          success: t(CONTENT.TOAST.DELETE_ITEM_SUCCESS) + item.name,
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

const blobExecutor = (blob) => {
  return (resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(blob);
  };
};

export const formCollectionRequest = async (values) => {
  const collection = {...values};
  collection.image = await fetch(collection.image)
  .then(response => response.blob())
  .then(blob => new Promise(blobExecutor(blob)));
  collection.theme = {
    name: collection.theme,
  };
  return collection;
};

export const formItemRequest = async (values) => {
  const request = {fields: []};
  values.image = await fetch(values.image)
  .then(response => response.blob())
  .then(blob => new Promise(blobExecutor(blob)));
  Object.entries(values).forEach(([key, value]) => {
    if (key.startsWith("customField")) {
      if (value.contentType === CONTENT_TYPE.DATE) {
        try {
          value.value = new Date(value.value).toISOString();
        } catch (error) {
          value.value = new Date().toISOString();
        }
      }
      request.fields = [...request.fields, value];
    } else {
      request[key] = value;
    }
  });
  return request;
};
