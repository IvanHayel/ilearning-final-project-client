import ShortTextIcon               from "@mui/icons-material/ShortText";
import {InputAdornment, TextField} from "@mui/material";
import "./Styles/Field.scss";

export const StringInputField = (props) => {
  const {index, label, saveField, className, defaultValue} = props;
  return (
      <TextField
          key={index} type="text" rows={3}
          label={label} variant="outlined" className={className}
          required autoFocus
          onChange={(event) => saveField(event)}
          onFocus={(event) => saveField(event)}
          defaultValue={defaultValue}
          inputProps={{
            maxLength: 255
          }}
          InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                  <ShortTextIcon />
                </InputAdornment>
            ),
          }}
      />
  );
};
