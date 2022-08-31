import NotesIcon                   from "@mui/icons-material/Notes";
import {InputAdornment, TextField} from "@mui/material";
import "./Styles/Field.scss";

export const TextInputField = (props) => {
  const {index, label, saveField, className, defaultValue} = props;
  return (
      <TextField
          key={index} type="text" rows={3}
          label={label} variant="outlined" className={className}
          multiline required autoFocus
          onChange={(event) => saveField(event)}
          onFocus={(event) => saveField(event)}
          defaultValue={defaultValue}
          InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                  <NotesIcon />
                </InputAdornment>
            ),
          }}
      />
  );
};
