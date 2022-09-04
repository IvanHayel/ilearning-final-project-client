import AccountCircleIcon      from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PublicIcon             from '@mui/icons-material/Public';
import SearchIcon             from '@mui/icons-material/Search';
import TranslateIcon          from '@mui/icons-material/Translate';
import {
  AppBar,
  Autocomplete,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography
}                             from "@mui/material";
import {
  Form,
  Formik
}                             from "formik";
import {
  observer
}                             from "mobx-react";
import React, {
  useEffect,
  useState
}                             from "react";
import {
  useTranslation
}                             from "react-i18next";
import {
  createSearchParams,
  useNavigate
}                             from "react-router-dom";
import {
  SideMenu,
  SignInModal,
  SignOutButton,
  SignUpModal,
  ThemeSwitch,
}                             from "../../Components/";
import {
  CONTENT,
  ROUTE_PARAMETER,
  ROUTE_URL
}                             from "../../Constants";
import {
  useStores
}                             from "../../Hooks";
import {
  getTags,
  getThemes,
  isAdmin,
  isAuthenticated,
  isRoot
}                             from "../../Services";
import "./Styles/Header.scss";

export const Header = observer(() => {
  const {t, i18n} = useTranslation();
  const navigate = useNavigate();
  const [searchCount, setSearchCount] = useState(0);
  const [isSearchOptionsLoading, setSearchOptionsLoading] = useState(false);
  const {themeStore, collectionStore} = useStores();
  const searchOptions = collectionStore.getSearchOptions();
  const isCurrentUserAuthenticated = isAuthenticated();
  const isCurrentUserAdmin = isCurrentUserAuthenticated && isAdmin();
  const isCurrentUserRoot = isCurrentUserAuthenticated && isRoot();
  const handleBrandClick = () => navigate(ROUTE_URL.HOME);
  const handleAdminBoardClick = () => navigate(ROUTE_URL.ADMIN.BOARD);
  const handleProfileClick = () => navigate(ROUTE_URL.PROFILE);
  const handleGlobalClick = () => navigate(ROUTE_URL.COLLECTIONS.GLOBAL);
  const handleLanguageClick = async () => {
    themeStore.switchLanguage();
    await i18n.changeLanguage(themeStore.getLanguage());
  };
  const handleThemeSwitch = (event) => {
    event.target.checked
        ? themeStore.setDarkMode()
        : themeStore.setLightMode();
  };
  const handleSearchSubmit = (values) => {
    const searchTerm = values.search.trim();
    if (searchTerm.length > 0) {
      const searchParams = createSearchParams({
        [ROUTE_PARAMETER.SEARCH.TERM]: searchTerm,
      });
      navigate(`${ROUTE_URL.SEARCH}?${searchParams}`);
      setSearchCount(searchCount + 1);
    }
  };
  const handleSearchFocus = async () => {
    await getTags();
    await getThemes();
  };
  useEffect(() => {
    i18n.changeLanguage(themeStore.getLanguage())
    .catch((error) => console.error(error));
  }, [i18n, themeStore]);
  useEffect(() => {
    const fetchTagsAndThemes = async () => {
      setSearchOptionsLoading(true);
      await getTags();
      await getThemes();
      setSearchOptionsLoading(false);
    };
    fetchTagsAndThemes().catch((error) => console.error(error));
  }, []);
  return (
      <AppBar color="primary" position="sticky" className="header-bar">
        <Toolbar>
          {isCurrentUserAuthenticated && (
              <>
                <SideMenu />
              </>
          )}
          <Typography
              color="inherit"
              variant="h5"
              noWrap
              onClick={handleBrandClick}
              className="brand"
          >
            {t(CONTENT.BRAND)}
          </Typography>
          <Box className="main-buttons">
            <IconButton
                size="large"
                onClick={handleGlobalClick} color="inherit"
            >
              <PublicIcon fontSize="large" />
            </IconButton>
            {(isCurrentUserAdmin || isCurrentUserRoot) && (
                <IconButton
                    color="inherit"
                    size="medium"
                    onClick={handleAdminBoardClick}
                >
                  <AdminPanelSettingsIcon fontSize="large" />
                </IconButton>
            )}
          </Box>
          <Formik
              onSubmit={handleSearchSubmit}
              initialValues={{search: ''}}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit
            }) => (
                <Form className="search-box">
                  <Autocomplete
                      key={searchCount}
                      freeSolo
                      autoHighlight
                      onInputChange={(_event, value) => {
                        values.search = value;
                      }}
                      renderInput={(params) => (
                          <TextField {...params}
                                     type="text"
                                     name="search"
                                     placeholder={t(CONTENT.SEARCH.LABEL)}
                                     variant="outlined"
                                     onBlur={handleBlur("search")}
                                     onChange={handleChange("search")}
                                     onFocus={handleSearchFocus}
                                     fullWidth
                                     InputProps={{
                                       ...params.InputProps,
                                       startAdornment: (
                                           <InputAdornment position="start">
                                             <IconButton
                                                 type="submit"
                                                 color="secondary"
                                                 size="large"
                                                 onSubmit={handleSubmit}>
                                               <SearchIcon
                                                   fontSize="medium" />
                                             </IconButton>
                                           </InputAdornment>
                                       ),
                                       endAdornment: (
                                           <React.Fragment>
                                             {isSearchOptionsLoading ?
                                                 <CircularProgress
                                                     color="inherit"
                                                     size={20} /> : null}
                                             {params.InputProps.endAdornment}
                                           </React.Fragment>
                                       ),
                                     }}
                          />
                      )}
                      options={searchOptions}
                      getOptionLabel={option => option.name || option}
                      groupBy={(option) => option.group}
                      loading={isSearchOptionsLoading}
                  />
                </Form>
            )}
          </Formik>
          <Box className="sign-group">
            {isCurrentUserAuthenticated ? (
                <>
                  <IconButton
                      color="inherit"
                      size="medium"
                      onClick={handleProfileClick}
                  >
                    <AccountCircleIcon fontSize="large" />
                  </IconButton>
                  <SignOutButton />
                </>
            ) : (
                <>
                  <SignInModal />
                  <SignUpModal />
                </>
            )}
          </Box>
          <Box className="config-group">
            <IconButton
                size="large"
                onClick={handleLanguageClick} color="inherit"
            >
              <TranslateIcon fontSize="medium" />
            </IconButton>
            <ThemeSwitch onClick={handleThemeSwitch}
                         checked={themeStore.isDarkMode()} />
          </Box>
        </Toolbar>
      </AppBar>
  );
});
