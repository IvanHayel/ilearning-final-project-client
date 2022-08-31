import NumbersIcon                 from "@mui/icons-material/Numbers";
import {InputAdornment, TextField} from "@mui/material";
import "./Styles/Field.scss";

export const NumberInputField = (props) => {
  const {index, label, saveField, className, defaultValue} = props;
  return (
      <TextField
          key={index} type="number"
          label={label} variant="outlined" className={className}
          autoFocus required
          defaultValue={defaultValue}
          onChange={(event) => saveField(event)}
          onFocus={(event) => saveField(event)}
          InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                  <NumbersIcon />
                </InputAdornment>
            ),
          }}
      />
  );
};
