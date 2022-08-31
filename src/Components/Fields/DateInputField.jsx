import {TextField}                        from "@mui/material";
import {
  AdapterDateFns
}                                         from "@mui/x-date-pickers/AdapterDateFns";
import {
  DateTimePicker
}                                         from "@mui/x-date-pickers/DateTimePicker";
import {
  LocalizationProvider
}                                         from "@mui/x-date-pickers/LocalizationProvider";
import enLocale                           from "date-fns/locale/en-US";
import ruLocale                           from "date-fns/locale/ru";
import {observer}                         from "mobx-react";
import {DATE_TIME_INPUT_FORMAT, LANGUAGE} from "../../Constants";
import {useStore}                         from "../../Hooks";
import "./Styles/Field.scss";

export const DateInputField = observer((props) => {
  const {index, label, saveField, className, value, onChange} = props;
  const themeStore = useStore("themeStore");
  const localeAdapter = themeStore.getLanguage() === LANGUAGE.RUSSIAN
      ? ruLocale : enLocale;
  return (
      <LocalizationProvider key={index}
                            adapterLocale={localeAdapter}
                            dateAdapter={AdapterDateFns}>
        <DateTimePicker
            inputFormat={DATE_TIME_INPUT_FORMAT}
            label={label}
            onChange={onChange}
            validationError={false}
            value={value}
            renderInput={(params) => (
                <TextField
                    type="datetime-local"
                    className={className}
                    autoFocus
                    onFocus={(event) => saveField(event)}
                    {...params}
                />
            )}
        />
      </LocalizationProvider>
  );
});
