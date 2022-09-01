export const ACTIONS = {
  CREATE: "create",
  EDIT: "edit",
  ADD: "add",
};

export const CONTENT_TYPE = {
  STRING: "STRING",
  TEXT: "TEXT",
  DATE: "DATE",
  NUMBER: "NUMBER",
  BOOLEAN: "BOOLEAN",
};

export const DATE_TIME_INPUT_FORMAT = "dd.MM.yyyy, HH:mm:ss";

export const COLLECTIONS_PER_PAGE = 12;
export const OWN_COLLECTIONS_PER_PAGE = 11;
export const ITEMS_PER_PAGE = 12;
export const ITEMS_PER_PAGE_OWNER = 11;
export const SEARCH_ELEMENTS_PER_PAGE = 4;

export const CONTENT = {
  TYPE: {
    "STRING": "type.string",
    "TEXT": "type.text",
    "DATE": "type.date",
    "NUMBER": "type.number",
    "BOOLEAN": "type.boolean",
  },
  BRAND: "brand",
  HOME: {
    TITLE: "home.title",
    DESCRIPTION: "home.description",
    TOP: "home.top",
    TAG_CLOUD: "home.tagCloud",
  },
  SIDE: {
    BACK: "side.back",
    ABOUT: "side.about",
    OWN_COLLECTIONS: "side.ownCollections",
    COLLECTIONS: "side.collections",
  },
  ADMIN_BOARD: {
    TITLE: "adminBoard.title",
    UNBLOCK: "adminBoard.unblock",
    BLOCK: "adminBoard.block",
    DELETE: "adminBoard.delete",
    GRANT_ADMIN_RIGHTS: "adminBoard.grantAdminRights",
    REVOKE_ADMIN_RIGHTS: "adminBoard.revokeAdminRights",
  },
  OWN_COLLECTIONS: {
    TITLE: "ownCollections.title",
  },
  COLLECTION_ITEMS: {
    TITLE: "collectionItems.title",
    MORE_BUTTON: "collectionItems.moreButton",
  },
  COLLECTIONS: {
    TITLE: "collections.title",
  },
  COLLECTION_PREVIEW: {
    OWNER: "collectionPreview.owner",
    THEME: "collectionPreview.theme",
    CREATED: "collectionPreview.created",
    MODIFIED: "collectionPreview.modified",
    COLLECTION: "collectionPreview.collection",
  },
  ITEM_PREVIEW: {
    CREATED: "itemPreview.created",
    MODIFIED: "itemPreview.modified",
    ITEM: "itemPreview.item",
  },
  ITEM: {
    GENERAL: {
      TITLE: "item.general.title",
      COLLECTION: "item.general.collection",
      THEME: "item.general.theme",
      OWNER: "item.general.owner",
      ITEM: "item.general.item",
      CREATED: "item.general.created",
      UPDATED: "item.general.updated",
    },
    ADDITIONAL: {
      TITLE: "item.additional.title"
    },
    COMMENT_PLACEHOLDER: "item.commentPlaceholder",
    COMMENT_PLACEHOLDER_UNAUTHORIZED: "item.commentPlaceholderUnauthorized",
  },
  DIALOG: {
    UNBLOCK: {
      TITLE: "dialog.unblock.title",
      FIRST_MESSAGE: "dialog.unblock.firstMessage",
      SECOND_MESSAGE: "dialog.unblock.secondMessage",
    },
    BLOCK: {
      TITLE: "dialog.block.title",
      FIRST_MESSAGE: "dialog.block.firstMessage",
      SECOND_MESSAGE: "dialog.block.secondMessage",
    },
    DELETE: {
      TITLE: "dialog.delete.title",
      FIRST_MESSAGE: "dialog.delete.firstMessage",
      SECOND_MESSAGE: "dialog.delete.secondMessage",
    },
    GRANT: {
      TITLE: "dialog.grant.title",
      FIRST_MESSAGE: "dialog.grant.firstMessage",
      SECOND_MESSAGE: "dialog.grant.secondMessage",
    },
    REVOKE: {
      TITLE: "dialog.revoke.title",
      FIRST_MESSAGE: "dialog.revoke.firstMessage",
      SECOND_MESSAGE: "dialog.revoke.secondMessage",
    },
    SORT: {
      TITLE: "dialog.sort.title",
      DIRECTION: {
        LABEL: "dialog.sort.direction.label",
        DEFAULT: "dialog.sort.direction.default",
        ASC: "dialog.sort.direction.asc",
        DESC: "dialog.sort.direction.desc",
      },
      STRATEGY: {
        LABEL: "dialog.sort.strategy.label",
        DEFAULT: "dialog.sort.strategy.default",
        CREATE_DATE: "dialog.sort.strategy.createDate",
        UPDATE_DATE: "dialog.sort.strategy.updateDate",
        NAME: "dialog.sort.strategy.name",
      },
    },
    CONFIRM: "dialog.confirm",
    CANCEL: "dialog.cancel",
  },
  USER: {
    USER_OR_USERS: "user.userOrUsers",
    USERNAME: "user.username",
    EMAIL: "user.email",
    ROLES: "user.roles",
    CREATED: "user.created",
    UPDATED: "user.updated",
    LAST_LOGIN: "user.lastLogin",
    ONLINE: "user.online",
    BLOCKED: "user.block",
  },
  FORM: {
    SIGN_IN: "form.signIn",
    SIGN_UP: "form.signUp",
    COLLECTION: "form.collection",
    ITEM: "form.item",
    USERNAME: "form.username",
    EMAIL: "form.email",
    PASSWORD: "form.password",
    CONFIRM_PASSWORD: "form.confirmPassword",
    CONTENT_TYPE: "form.contentType",
    NAME: "form.name",
    THEME: "form.theme",
    CREATE: "form.create",
    EDIT: "form.edit",
    ADD: "form.add",
    RANDOM_IMAGE: "form.randomImage",
    YOUR_IMAGE: "form.yourImage",
    ADD_FIELD: "form.addField",
    EDIT_FIELD: "form.editField",
    TAGS: "form.tags",
    TAG_HOLDER: "form.tagHolder",
  },
  TOAST: {
    USER: "toast.user",
    PENDING: "toast.pending",
    SIGN_OUT_SUCCESS: "toast.signOutSuccess",
    SIGN_UP_SUCCESS: "toast.signUpSuccess",
    SIGN_IN_SUCCESS: "toast.signInSuccess",
    TOKEN_REFRESH_SUCCESS: "toast.tokenRefreshSuccess",
    SESSION_EXPIRED: "toast.sessionExpired",
    DELETE_USER_SUCCESS: "toast.deleteUserSuccess",
    BLOCK_USER_SUCCESS: "toast.blockUserSuccess",
    UNBLOCK_USER_SUCCESS: "toast.unblockUserSuccess",
    GRANT_ADMIN_RIGHTS_SUCCESS: "toast.grantAdminRightsSuccess",
    REVOKE_ADMIN_RIGHTS_SUCCESS: "toast.revokeAdminRightsSuccess",
    EJECT_USER_SUCCESS: "toast.ejectUserSuccess",
    CREATE_COLLECTION_SUCCESS: "toast.createCollectionSuccess",
    DELETE_COLLECTION_SUCCESS: "toast.deleteCollectionSuccess",
    EDIT_COLLECTION_SUCCESS: "toast.editCollectionSuccess",
    ADD_ITEM_SUCCESS: "toast.addItemSuccess",
    UPDATE_ITEM_SUCCESS: "toast.updateItemSuccess",
    DELETE_ITEM_SUCCESS: "toast.deleteItemSuccess",
    LIKE_ITEM_SUCCESS: "toast.likeItem",
    LEAVE_COMMENT: "toast.leaveComment",
  },
  VALIDATION: {
    USERNAME: {
      ENTER: "validation.username.enter",
      SIZE: "validation.username.size",
      REQUIRED: "validation.username.required",
    },
    EMAIL: {
      ENTER: "validation.email.enter",
      VALID: "validation.email.valid",
      REQUIRED: "validation.email.required",
    },
    PASSWORD: {
      ENTER: "validation.password.enter",
      SIZE: "validation.password.size",
      REQUIRED: "validation.password.required",
    },
    CONFIRM_PASSWORD: {
      ENTER: "validation.confirmPassword.enter",
      MATCH: "validation.confirmPassword.match",
      REQUIRED: "validation.confirmPassword.required",
    },
    COLLECTION_NAME: {
      ENTER: "validation.collectionName.enter",
      SIZE: "validation.collectionName.size",
      REQUIRED: "validation.collectionName.required",
    },
    COLLECTION_THEME: {
      ENTER: "validation.collectionTheme.enter",
      SIZE: "validation.collectionTheme.size",
      REQUIRED: "validation.collectionTheme.required",
    },
    FIELD_NAME: {
      ENTER: "validation.fieldName.enter",
      SIZE: "validation.fieldName.size",
      REQUIRED: "validation.fieldName.required",
      UNIQUE: "validation.fieldName.unique",
      FORMAT: "validation.fieldName.format",
    },
    IMAGE: {
      REQUIRED: "validation.image.required",
    }
  },
  SEARCH: {
    LABEL: "search.placeholder",
    THEMES: "search.themes",
    TAGS: "search.tags",
    RESULTS: "search.results",
    WHERE_LOOK: "search.whereLook",
    SCOPE: {
      GLOBAL: "search.scope.global",
      COLLECTIONS: "search.scope.collections",
      ITEMS: "search.scope.items",
      THEMES: "search.scope.themes",
      TAGS: "search.scope.tags",
    },
    FOUND: {
      COLLECTIONS: "search.found.collections",
      ITEMS: "search.found.items",
      NOTHING: "search.found.nothing"
    }
  },
  ERROR_404: {
    TITLE: "error404.title",
    DESCRIPTION: "error404.description",
    BACK_TO_HOME: "error404.backToHome",
  }
};

export const CONTENT_TYPES = Object.entries(CONTENT.TYPE);
