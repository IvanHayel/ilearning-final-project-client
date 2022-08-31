import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
}                           from "@mui/material";
import React, {useState}    from "react";
import {useTranslation}     from "react-i18next";
import {CONTENT}            from "../../Constants";
import "./Styles/Dialog.scss";

export const UnblockDialog = (props) => {
  const {t} = useTranslation();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const {
    onConfirmUnblock,
    disableButton,
    buttonClassName,
    buttonSize,
  } = props;
  const handleUnblockClick = (event) => {
    event.stopPropagation();
    setDialogOpen(true);
  };
  const handleDialogClose = () => setDialogOpen(false);
  const handleConfirmBlock = async () => {
    await onConfirmUnblock();
    handleDialogClose();
  };
  return (
      <Box className="dialog-box">
        <IconButton
            className={`dialog-action-button ${buttonClassName}`}
            color="success"
            size={buttonSize ? buttonSize : "small"}
            onClick={handleUnblockClick}
            disabled={disableButton}
        >
          <AccessibilityNewIcon fontSize="large" />
        </IconButton>
        <Dialog
            className="dialog"
            open={isDialogOpen}
            onClose={handleDialogClose}
        >
          <DialogTitle color="error">
            {t(CONTENT.DIALOG.UNBLOCK.TITLE)}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t(CONTENT.DIALOG.UNBLOCK.FIRST_MESSAGE)}
              <br />
              {t(CONTENT.DIALOG.UNBLOCK.SECOND_MESSAGE)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
                className="dialog-action-button"
                onClick={handleDialogClose}
                autoFocus={true}
                variant="contained"
                color="warning"
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
