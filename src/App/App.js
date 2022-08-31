import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import {observer}                              from "mobx-react-lite";
import {useEffect}                             from "react";
import "react-chat-elements/dist/main.css"
import {Route, Routes}                         from "react-router-dom";
import {ToastContainer}                        from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import 'simplebar/dist/simplebar.min.css';
import {ROUTE_URL}                             from "../Constants";
import {useStore}                              from "../Hooks";
import {
  About,
  AdminBoard,
  CollectionItems,
  Footer,
  GlobalCollections,
  Header,
  Home,
  Item,
  OAuth2Redirect,
  OwnCollections,
  Profile,
  Search,
  Whoops404,
}                                              from "../Modules";
import {isAdmin, isAuthenticated, isRoot}      from "../Services";
import {
  connectToSocket
}                                              from "../Services/CommentService";

const App = observer(() => {
  const themeStore = useStore("themeStore");
  const theme = themeStore.getTheme();
  const isCurrentUserAuthenticated = isAuthenticated();
  const isCurrentUserAdmin = isCurrentUserAuthenticated && isAdmin();
  const isCurrentUserRoot = isCurrentUserAuthenticated && isRoot();
  useEffect(() => {
    connectToSocket();
  }, []);
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header />
          <Routes>
            <Route exact path={ROUTE_URL.HOME}
                   element={<Home />} />
            <Route exact path={ROUTE_URL.ABOUT}
                   element={<About />} />
            <Route exact path={ROUTE_URL.SEARCH}
                   element={<Search />} />
            <Route exact path={ROUTE_URL.COLLECTIONS.GLOBAL}
                   element={<GlobalCollections />} />
            <Route exact path={ROUTE_URL.COLLECTIONS.COLLECTION}
                   element={<CollectionItems />} />
            <Route exact path={ROUTE_URL.COLLECTIONS.ITEM}
                   element={<Item />} />
            {isCurrentUserAuthenticated && (
                <>
                  <Route exact path={ROUTE_URL.PROFILE}
                         element={<Profile />} />
                  <Route exact path={ROUTE_URL.COLLECTIONS.OWN}
                         element={<OwnCollections />} />
                </>
            )}
            {(isCurrentUserAdmin || isCurrentUserRoot) && (
                <>
                  <Route exact path={ROUTE_URL.ADMIN.BOARD}
                         element={<AdminBoard />}
                  />
                </>
            )}
            <Route exact path={ROUTE_URL.OAUTH2}
                   element={<OAuth2Redirect />} />
            <Route exact path="*"
                   element={<Whoops404 />} />
          </Routes>
          <Footer />
          <ToastContainer
              position="bottom-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={theme.palette.mode}
          />
        </Container>
      </ThemeProvider>
  );
});

export default App;
