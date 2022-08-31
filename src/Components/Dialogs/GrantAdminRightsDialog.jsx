import BoltIcon          from '@mui/icons-material/Bolt';
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

export const GrantAdminRightsDialog = (props) => {
  const {t} = useTranslation();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const {
    onConfirmGrant,
    disableButton,
    buttonClassName,
    buttonSize,
  } = props;
  const handleGrantClick = (event) => {
    event.stopPropagation();
    setDialogOpen(true);
  };
  const handleDialogClose = () => setDialogOpen(false);
  const handleConfirmBlock = async () => {
    await onConfirmGrant();
    handleDialogClose();
  };
  return (
      <Box className="dialog-box">
        <IconButton
            className={`dialog-action-button ${buttonClassName}`}
            color="success"
            size={buttonSize ? buttonSize : "small"}
            onClick={handleGrantClick}
            disabled={disableButton}
        >
          <BoltIcon fontSize="large" />
        </IconButton>
        <Dialog
            className="dialog"
            open={isDialogOpen}
            onClose={handleDialogClose}
        >
          <DialogTitle color="error">
            {t(CONTENT.DIALOG.GRANT.TITLE)}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t(CONTENT.DIALOG.GRANT.FIRST_MESSAGE)}
              <br />
              {t(CONTENT.DIALOG.GRANT.SECOND_MESSAGE)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
                className="dialog-action-button"
                onClick={handleDialogClose}
                autoFocus={true}
                color="error"
                variant="contained"
            >
              {t(CONTENT.DIALOG.CANCEL)}
            </Button>
            <Button
                className="dialog-action-button"
                onClick={handleConfirmBlock}
                color="success"
                variant="contained"
            >
              {t(CONTENT.DIALOG.CONFIRM)}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
};
