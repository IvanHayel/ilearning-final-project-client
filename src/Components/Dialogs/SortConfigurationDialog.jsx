import FilterListIcon                           from '@mui/icons-material/FilterList';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
}                                               from "@mui/material";
import React, {useState}                        from "react";
import {useTranslation}                         from "react-i18next";
import {CONTENT, SORT_DIRECTION, SORT_STRATEGY} from "../../Constants";
import "./Styles/Dialog.scss";

export const SortConfigurationDialog = (props) => {
  const {t} = useTranslation();
  const {
    currentDirection,
    currentStrategy,
    onDialogClose,
    disableButton,
    buttonClassName,
    buttonSize,
  } = props;
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [direction, setDirection] = useState(currentDirection);
  const [strategy, setStrategy] = useState(currentStrategy);
  const handleDirectionChange = (event) => {
    const value = event.target.value;
    setDirection(value);
  };
  const handleStrategyChange = (event) => {
    const value = event.target.value;
    setStrategy(value);
  };
  const handleSortClick = (event) => {
    event.stopPropagation();
    setDialogOpen(true);
  };
  const handleDialogClose = async () => {
    setDialogOpen(false);
    const isChanged =
        direction !== currentDirection || strategy !== currentStrategy;
    onDialogClose(isChanged, direction, strategy);
  };
  return (
      <Box className="dialog-box">
        <IconButton
            className={`dialog-action-button ${buttonClassName}`}
            color="info"
            size={buttonSize ? buttonSize : "medium"}
            onClick={handleSortClick}
            disabled={disableButton}
            sx={{backgroundColor: "background.paper"}}
        >
          <FilterListIcon fontSize="large" />
        </IconButton>
        <Dialog
            className="dialog"
            open={isDialogOpen}
            onClose={handleDialogClose}
        >
          <DialogTitle color="secondary.light" fontWeight="bold">
            {t(CONTENT.DIALOG.SORT.TITLE)}
          </DialogTitle>
          <DialogContent>
            <TextField
                value={direction}
                onChange={handleDirectionChange}
                select
                label={t(CONTENT.DIALOG.SORT.DIRECTION.LABEL)}
                sx={{margin: "2vh"}}
            >
              <MenuItem value={SORT_DIRECTION.DEFAULT}>
                <em>{t(CONTENT.DIALOG.SORT.DIRECTION.DEFAULT)}</em>
              </MenuItem>
              <MenuItem value={SORT_DIRECTION.ASC}>
                {t(CONTENT.DIALOG.SORT.DIRECTION.ASC)}
              </MenuItem>
              <MenuItem value={SORT_DIRECTION.DESC}>
                {t(CONTENT.DIALOG.SORT.DIRECTION.DESC)}
              </MenuItem>
            </TextField>
            <TextField
                value={strategy}
                onChange={handleStrategyChange}
                select
                label={t(CONTENT.DIALOG.SORT.STRATEGY.LABEL)}
                sx={{margin: "2vh"}}
            >
              <MenuItem value={SORT_STRATEGY.DEFAULT}>
                <em>{t(CONTENT.DIALOG.SORT.STRATEGY.DEFAULT)}</em>
              </MenuItem>
              <MenuItem value={SORT_STRATEGY.CREATE_DATE}>
                {t(CONTENT.DIALOG.SORT.STRATEGY.CREATE_DATE)}
              </MenuItem>
              <MenuItem value={SORT_STRATEGY.UPDATE_DATE}>
                {t(CONTENT.DIALOG.SORT.STRATEGY.UPDATE_DATE)}
              </MenuItem>
              <MenuItem value={SORT_STRATEGY.NAME}>
                {t(CONTENT.DIALOG.SORT.STRATEGY.NAME)}
              </MenuItem>
            </TextField>
          </DialogContent>
        </Dialog>
      </Box>
  );
};
