import {t}                                      from "i18next";
import {toast}                                  from "react-toastify";
import {api}                                    from "../Config";
import {BASIC_TOAST_OPTIONS, CONTENT, USER_API} from "../Constants";
import stores                                   from "../Stores";
import {createErrorMessage}                     from "../Utils";

const {userStore} = stores;

export const getAllUsers = async () => {
  try {
    const response = await api.get(USER_API.USERS);
    userStore.setUsers(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteUser = async (id) => {
  try {
    const url = `${USER_API.USERS}/${id}`;
    const response = await toast.promise(
        api.delete(url),
        {
          pending: t(CONTENT.TOAST.PENDING),
          success: t(CONTENT.TOAST.DELETE_USER_SUCCESS) + id,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS
    );
    await getAllUsers();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const blockUser = async (id) => {
  try {
    const url = `${USER_API.BLOCK_USER}${id}`;
    const response = await toast.promise(
        api.put(url),
        {
          pending: t(CONTENT.TOAST.PENDING),
          success: t(CONTENT.TOAST.BLOCK_USER_SUCCESS) + id,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS
    );
    await getAllUsers();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const unblockUser = async (id) => {
  try {
    const url = `${USER_API.UNBLOCK_USER}${id}`;
    const response = await toast.promise(
        api.put(url),
        {
          pending: t(CONTENT.TOAST.PENDING),
          success: t(CONTENT.TOAST.UNBLOCK_USER_SUCCESS) + id,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS
    );
    await getAllUsers();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const grantAdminRights = async (id) => {
  try {
    const url = `${USER_API.GRANT_ADMIN_RIGHTS}${id}`;
    const response = await toast.promise(
        api.put(url),
        {
          pending: t(CONTENT.TOAST.PENDING),
          success: t(CONTENT.TOAST.GRANT_ADMIN_RIGHTS_SUCCESS) + id,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS
    );
    await getAllUsers();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const revokeAdminRights = async (id) => {
  try {
    const url = `${USER_API.REVOKE_ADMIN_RIGHTS}${id}`;
    const response = await toast.promise(
        api.put(url),
        {
          pending: t(CONTENT.TOAST.PENDING),
          success: t(CONTENT.TOAST.REVOKE_ADMIN_RIGHTS_SUCCESS) + id,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS
    );
    await getAllUsers();
    return response;
  } catch (error) {
    return error.response;
  }
};
