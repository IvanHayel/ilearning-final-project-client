import {createTheme}        from "@mui/material";
import {green, grey, pink}  from "@mui/material/colors";
import {enUS, ruRU}         from "@mui/x-data-grid";
import TimeAgo              from "javascript-time-ago";
import en                   from 'javascript-time-ago/locale/en'
import ru                   from 'javascript-time-ago/locale/ru'
import {makeAutoObservable} from "mobx";
import {makePersistable}    from "mobx-persist-store";
import {LANGUAGE}           from "../Constants";

TimeAgo.addLocale(en);
TimeAgo.addLocale(ru);
TimeAgo.setDefaultLocale(en);

export default class ThemeStore {
  mode = "dark";
  language = LANGUAGE.ENGLISH;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "ThemeStore",
      properties: ["mode", "language"],
      storage: localStorage,
    }).catch((error) =>
        console.log("Unable to persist theme store:", error)
    );
  }

  setDarkMode() {
    this.mode = "dark";
  }

  setLightMode() {
    this.mode = "light";
  }

  isDarkMode() {
    return this.mode === "dark";
  }

  getTheme() {
    return this.isDarkMode() ? darkTheme : lightTheme;
  }

  getBackgroundPaperColor() {
    return this.isDarkMode() ? grey[800] : grey[200];
  }

  switchLanguage() {
    this.language = this.language === LANGUAGE.ENGLISH
        ? LANGUAGE.RUSSIAN
        : LANGUAGE.ENGLISH;
  }

  getLanguage() {
    return this.language;
  }

  getDataGridLocale() {
    return this.language === LANGUAGE.ENGLISH
        ? enUS
        : ruRU;
  }

  getTimeAgo() {
    const locale = this.language === LANGUAGE.RUSSIAN ? "ru-RU" : "en-US";
    return new TimeAgo(locale);
  }
}

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: pink[800],
    },
    secondary: {
      main: green[800],
    },
    background: {
      default: grey[300],
      paper: grey[200],
    }
  }
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: pink[800],
    },
    secondary: {
      main: green[800],
    },
    background: {
      default: grey[900],
      paper: grey[800],
    }
  }
});