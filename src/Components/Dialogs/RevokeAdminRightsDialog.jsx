import ThumbDownIcon     from '@mui/icons-material/ThumbDown';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
}                        from "@mui/material";
import React, {useState} from "react";
import {useTranslation}  from "react-i18next";
import {CONTENT}         from "../../Constants";
import "./Styles/Dialog.scss";

export const RevokeAdminRightsDialog = (props) => {
  const {t} = useTranslation();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const {
    onConfirmRevoke,
    disableButton,
    buttonClassName,
    buttonSize,
  } = props;
  const handleRevokeClick = (event) => {
    event.stopPropagation();
    setDialogOpen(true);
  };
  const handleDialogClose = () => setDialogOpen(false);
  const handleConfirmBlock = async () => {
    await onConfirmRevoke();
    handleDialogClose();
  };
  return (
      <Box className="dialog-box">
        <IconButton
            className={`dialog-action-button ${buttonClassName}`}
            color="error"
            size={buttonSize ? buttonSize : "small"}
            onClick={handleRevokeClick}
            disabled={disableButton}
        >
          <ThumbDownIcon fontSize="large" />
        </IconButton>
        <Dialog
            className="dialog"
            open={isDialogOpen}
            onClose={handleDialogClose}
        >
          <DialogTitle color="error">
            {t(CONTENT.DIALOG.REVOKE.TITLE)}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t(CONTENT.DIALOG.REVOKE.FIRST_MESSAGE)}
              <br />
              {t(CONTENT.DIALOG.REVOKE.SECOND_MESSAGE)}
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
                onClick={handleConfirmBlock}
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
