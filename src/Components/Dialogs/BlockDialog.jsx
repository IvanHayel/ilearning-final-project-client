import BlockIcon         from '@mui/icons-material/Block';
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

export const BlockDialog = (props) => {
  const {t} = useTranslation();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const {
    onConfirmBlock,
    disableButton,
    buttonClassName,
    buttonSize,
  } = props;
  const handleBlockClick = (event) => {
    event.stopPropagation();
    setDialogOpen(true);
  };
  const handleDialogClose = () => setDialogOpen(false);
  const handleConfirmBlock = async () => {
    await onConfirmBlock();
    handleDialogClose();
  };
  return (
      <Box className="dialog-box">
        <IconButton
            className={`dialog-action-button ${buttonClassName}`}
            color="error"
            size={buttonSize ? buttonSize : "small"}
            onClick={handleBlockClick}
            disabled={disableButton}
        >
          <BlockIcon fontSize="large" />
        </IconButton>
        <Dialog
            className="dialog"
            open={isDialogOpen}
            onClose={handleDialogClose}
        >
          <DialogTitle color="error">
            {t(CONTENT.DIALOG.BLOCK.TITLE)}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t(CONTENT.DIALOG.BLOCK.FIRST_MESSAGE)}
              <br />
              {t(CONTENT.DIALOG.BLOCK.SECOND_MESSAGE)}
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
