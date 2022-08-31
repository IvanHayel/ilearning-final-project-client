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

  getOwnCollections() {
    return [...this.ownCollections];
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
