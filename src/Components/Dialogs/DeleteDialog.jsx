import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
}                              from "@mui/material";
import React, {useState}       from "react";
import {useTranslation}        from "react-i18next";
import {CONTENT}               from "../../Constants";
import "./Styles/Dialog.scss";

export const DeleteDialog = (props) => {
  const {t} = useTranslation();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const {
    itemToDelete,
    onConfirmDelete,
    disableButton,
    buttonClassName,
    buttonSize,
  } = props;
  const handleDeleteClick = (event) => {
    event.stopPropagation();
    setDialogOpen(true);
  };
  const handleDialogClose = () => setDialogOpen(false);
  const handleConfirmDelete = async () => {
    await onConfirmDelete();
    handleDialogClose();
  };
  return (
      <Box className="dialog-box">
        <IconButton
            className={`dialog-action-button ${buttonClassName}`}
            color="error"
            size={buttonSize || "small"}
            onClick={handleDeleteClick}
            disabled={disableButton}
        >
          <RemoveCircleOutlineIcon fontSize="large" />
        </IconButton>
        <Dialog
            className="dialog"
            open={isDialogOpen}
            onClose={handleDialogClose}
        >
          <DialogTitle color="error">
            {t(CONTENT.DIALOG.DELETE.TITLE)} {itemToDelete}?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t(CONTENT.DIALOG.DELETE.FIRST_MESSAGE)} {itemToDelete}.
              <br />
              {t(CONTENT.DIALOG.DELETE.SECOND_MESSAGE)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
                className="dialog-action-button"
                onClick={handleDialogClose}
                autoFocus={true}
                color="success"
                variant="contained"
            >
              {t(CONTENT.DIALOG.CANCEL)}
            </Button>
            <Button
                className="dialog-action-button"
                onClick={handleConfirmDelete}
                color="error"
                variant="contained"
            >
              {t(CONTENT.DIALOG.CONFIRM)}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
};
