import SecurityIcon                 from "@mui/icons-material/Security";
import {Box, Stack, Typography}     from "@mui/material";
import {DataGrid, GridToolbar}      from "@mui/x-data-grid";
import {observer}                   from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {useTranslation}             from "react-i18next";
import {
  BlockDialog,
  DeleteDialog,
  GrantAdminRightsDialog,
  RevokeAdminRightsDialog,
  UnblockDialog
}                                   from "../../Components";
import {CONTENT}                    from "../../Constants";
import {useStores}                  from "../../Hooks";
import {
  blockUser,
  deleteUser,
  getAllUsers,
  grantAdminRights,
  revokeAdminRights,
  unblockUser
}                                   from "../../Services";
import "./Styles/AdminBoard.scss";

export const AdminBoard = observer(() => {
  const {t} = useTranslation();
  const [pageSize, setPageSize] = useState(5);
  const {userStore, themeStore} = useStores();
  const dataGridLocale = themeStore.getDataGridLocale();
  const users = userStore.getUsers();
  const selectedUsers = userStore.getSelectedUsers();
  const columns = [
    {field: "id", headerName: "ID", type: "number", width: 50,},
    {field: "username", headerName: t(CONTENT.USER.USERNAME), flex: 2},
    {field: "email", headerName: t(CONTENT.USER.EMAIL), flex: 2},
    {field: "roles", headerName: t(CONTENT.USER.ROLES), flex: 2},
    {field: "createDate", headerName: t(CONTENT.USER.CREATED), flex: 3},
    {field: "updateDate", headerName: t(CONTENT.USER.UPDATED), flex: 3},
    {field: "lastLogin", headerName: t(CONTENT.USER.LAST_LOGIN), flex: 3},
    {field: "active", headerName: t(CONTENT.USER.ONLINE), flex: 1},
    {field: "blocked", headerName: t(CONTENT.USER.BLOCKED), flex: 1},
  ];
  const handleSelectionChange = (ids) => userStore.setSelectedUserIds(ids);
  const handleConfirmUnblock = async () => {
    for (const rowToUnblock of selectedUsers.filter((row) => row.blocked)) {
      await unblockUser(rowToUnblock.id);
    }
  };
  const handleConfirmBlock = async () => {
    for (const userToBlock of selectedUsers.filter((row) => !row.blocked)) {
      await blockUser(userToBlock.id);
    }
  };
  const handleConfirmDelete = async () => {
    for (const userToDelete of selectedUsers) {
      await deleteUser(userToDelete.id);
    }
  };
  const handleConfirmGrant = async () => {
    for (const userToGrant of selectedUsers
    .filter((user) => !userStore.isAdmin(user.id))) {
      await grantAdminRights(userToGrant.id);
    }
  };
  const handleConfirmRevoke = async () => {
    for (const userToRevoke of selectedUsers
    .filter((user) => userStore.isAdmin(user.id))) {
      await revokeAdminRights(userToRevoke.id);
    }
  }
  useEffect(() => {
    const fetchUsers = async () => {
      await getAllUsers();
    };
    fetchUsers().catch((error) => console.error(error));
  }, []);
  return (
      <Box className="board">
        <Typography color="primary" className="board-title" variant="h4">
          {t(CONTENT.ADMIN_BOARD.TITLE)} <SecurityIcon size="large" />
        </Typography>
        {
            selectedUsers.length > 0 && (
                <Stack>
                  <Box className="action-buttons">
                    <Typography variant="h5">
                      {t(CONTENT.ADMIN_BOARD.UNBLOCK)}
                    </Typography>
                    <UnblockDialog
                        buttonSize="large"
                        onConfirmUnblock={handleConfirmUnblock}
                    />
                    <Typography variant="h5">
                      {t(CONTENT.ADMIN_BOARD.BLOCK)}
                    </Typography>
                    <BlockDialog
                        buttonSize="large"
                        onConfirmBlock={handleConfirmBlock}
                    />
                    <Typography variant="h5">
                      {t(CONTENT.ADMIN_BOARD.DELETE)}
                    </Typography>
                    <DeleteDialog
                        itemToDelete={t(CONTENT.USER.USER_OR_USERS)}
                        buttonSize="large"
                        onConfirmDelete={handleConfirmDelete}
                    />
                  </Box>
                  <Box className="action-buttons">
                    <Typography variant="h5">
                      {t(CONTENT.ADMIN_BOARD.GRANT_ADMIN_RIGHTS)}
                    </Typography>
                    <GrantAdminRightsDialog
                        buttonSize="large"
                        onConfirmGrant={handleConfirmGrant}
                    />
                    <Typography variant="h5">
                      {t(CONTENT.ADMIN_BOARD.REVOKE_ADMIN_RIGHTS)}
                    </Typography>
                    <RevokeAdminRightsDialog
                        buttonSize="large"
                        onConfirmRevoke={handleConfirmRevoke}
                    />
                  </Box>
                </Stack>
            )
        }
        <DataGrid
            className={"board-grid"}
            rows={users}
            columns={columns}
            pageSize={pageSize}
            autoHeight
            checkboxSelection
            disableSelectionOnClick
            onPageSizeChange={(size) => setPageSize(size)}
            rowsPerPageOptions={[1, 5, 10, 15, 30, 50, 100]}
            components={{
              Toolbar: GridToolbar
            }}
            localeText={dataGridLocale.components.MuiDataGrid.defaultProps.localeText}
            onSelectionModelChange={handleSelectionChange}
        />
      </Box>
  );
});
