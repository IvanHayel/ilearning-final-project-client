import {t}                  from "i18next";
import {makeAutoObservable} from "mobx";
import {CONTENT}            from "../Constants";

export default class CollectionStore {
  collections = [];
  ownCollections = [];
  searchCollections = [];
  topCollections = [];
  items = [];
  searchItems = [];
  tags = [];
  tagsForCloud = [];
  themes = [];
  collection = {
    id: null,
    createDate: null,
    updateDate: null,
    name: null,
    theme: {
      id: null,
      name: null,
    },
    owner: {
      id: null,
      username: null,
    },
    imageLink: null,
    items: [],
  };
  item = {
    id: null,
    createDate: null,
    updateDate: null,
    name: null,
    imageLink: null,
    collection: null,
    fields: [],
    comments: [],
    likes: [],
    tags: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  setCollections(collections) {
    this.collections = [...collections];
  }

  setOwnCollections(collections) {
    this.ownCollections = [...collections];
  }

  setTopCollections(collections) {
    this.topCollections = [...collections];
  }

  setCollection(collection) {
    this.collection = {...collection};
  }

  setItems(items) {
    this.items = [...items];
  }

  setItem(item) {
    this.item = {...item};
  }

  setTags(tags) {
    this.tags = [...tags];
  }

  setTagsForCloud(tags) {
    this.tagsForCloud = tags;
  }

  setThemes(themes) {
    this.themes = [...themes];
  }

  setSearchCollections(collections) {
    this.searchCollections = [...collections];
  }

  setSearchItems(items) {
    this.searchItems = [...items];
  }

  getCollections() {
    return [...this.collections];
  }

  getCollectionsCsv() {
    return this.mapCollectionsToCsv([...this.collections]);
  }

  getOwnCollections() {
    return [...this.ownCollections];
  }

  getOwnCollectionsCsv() {
    return this.mapCollectionsToCsv([...this.ownCollections]);
  }

  getTopCollections() {
    return [...this.topCollections];
  }

  getCollection() {
    return {...this.collection};
  }

  getItems() {
    return [...this.items];
  }

  getItemsCsv() {
    return [...this.items].map(item => {
      const mappedItem = {
        [t(CONTENT.CSV.ID)]: item.id,
        [t(CONTENT.CSV.COLLECTION)]: item.collection.name,
        [t(CONTENT.CSV.ITEM)]: item.name,
        [t(CONTENT.CSV.OWNER)]: item.collection.owner.username,
        [t(CONTENT.CSV.IMAGE)]: item.imageLink,
        [t(CONTENT.CSV.TAGS)]: item.tags.map(tag => tag.name),
        [t(CONTENT.CSV.COMMENTS)]: item.comments.length,
        [t(CONTENT.CSV.LIKES)]: item.likes.length,
        [t(CONTENT.CSV.CREATED)]: new Date(item.createDate).toLocaleString(),
        [t(CONTENT.CSV.UPDATED)]: new Date(item.updateDate).toLocaleString(),
      };
      item.fields.forEach(field => {
        mappedItem[field.name] = field.value;
      });
      return mappedItem;
    });
  }

  getItem() {
    return {...this.item};
  }

  getTags() {
    return [...this.tags].map(tag => tag.name);
  }

  getTagsForCloud() {
    return Object.entries({...this.tagsForCloud})
    .map((entry) => {
      return {
        text: entry[0],
        value: entry[1]
      };
    });
  }

  getThemes() {
    return [...this.themes].map(theme => theme.name);
  }

  getSearchCollections() {
    return [...this.searchCollections];
  }

  getSearchItems() {
    return [...this.searchItems];
  }

  getSearchOptions() {
    const themeGroup = [...this.themes];
    themeGroup.forEach(theme => theme.group = t(CONTENT.SEARCH.THEMES));
    const tagGroup = [...this.tags];
    tagGroup.forEach(tag => tag.group = t(CONTENT.SEARCH.TAGS));
    return [...themeGroup, ...tagGroup];
  }

  mapCollectionsToCsv(collections) {
    return collections.map(collection => {
      return {
        [t(CONTENT.CSV.ID)]: collection.id,
        [t(CONTENT.CSV.THEME)]: collection.theme.name,
        [t(CONTENT.CSV.COLLECTION)]: collection.name,
        [t(CONTENT.CSV.OWNER)]: collection.owner.username,
        [t(CONTENT.CSV.IMAGE)]: collection.imageLink,
        [t(CONTENT.CSV.ITEMS)]: collection.items.length,
        [t(CONTENT.CSV.CREATED)]: new Date(
            collection.createDate).toLocaleString(),
        [t(CONTENT.CSV.UPDATED)]: new Date(
            collection.updateDate).toLocaleString(),
      };
    })
  }

  clearStore() {
    this.collections = [];
    this.ownCollections = [];
    this.items = [];
    this.clearSearch();
    this.collection = {
      id: null,
      createDate: null,
      updateDate: null,
      name: null,
      theme: {
        id: null,
        name: null,
      },
      owner: {
        id: null,
        username: null,
      },
      imageLink: null,
      items: [],
    };
    this.item = {
      id: null,
      createDate: null,
      updateDate: null,
      name: null,
      imageLink: null,
      collection: null,
      fields: [],
      comments: [],
      likes: [],
      tags: [],
    };
  }

  clearSearch() {
    this.searchCollections = [];
    this.searchItems = [];
  }
}
