import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import "./Styles/Field.scss";

export const BooleanInputField = (props) => {
  const {index, label, saveField, defaultValue} = props;
  return (
      <FormGroup key={index} className="boolean-field">
        <FormControlLabel
            control={<Checkbox
                autoFocus
                onChange={(event) => saveField(event)}
                onFocus={(event) => saveField(event)}
                defaultChecked={defaultValue === "true"} />}
            label={label} labelPlacement="start"
        />
      </FormGroup>
  );
};
