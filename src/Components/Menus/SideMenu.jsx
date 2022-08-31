import CollectionsIcon      from '@mui/icons-material/Collections';
import InfoOutlinedIcon     from "@mui/icons-material/InfoOutlined";
import MenuIcon             from "@mui/icons-material/Menu";
import MenuOpenIcon         from "@mui/icons-material/MenuOpen";
import PublicIcon           from '@mui/icons-material/Public';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
}                           from "@mui/material";
import React, {useState}    from "react";
import {useTranslation}     from "react-i18next";
import {useNavigate}        from "react-router-dom";
import {CONTENT, ROUTE_URL} from "../../Constants";
import "./Styles/SideMenu.scss";

export const SideMenu = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);
  const handleBackClick = () => setSideMenuOpen(!isSideMenuOpen);
  const handleAboutClick = () => {
    navigate(ROUTE_URL.ABOUT);
    setSideMenuOpen(false);
  };
  const handleCollectionsClick = () => {
    navigate(ROUTE_URL.COLLECTIONS.GLOBAL);
    setSideMenuOpen(false);
  };
  const handleOwnCollectionsClick = () => {
    navigate(ROUTE_URL.COLLECTIONS.OWN);
    setSideMenuOpen(false);
  };
  return (
      <Box>
        <IconButton
            className="side-bar-icon-button"
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setSideMenuOpen(!isSideMenuOpen)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
            anchor="left"
            open={isSideMenuOpen}
            onClose={() => setSideMenuOpen(false)}
        >
          <List className="side-menu">
            <ListItem className="menu-item">
              <ListItemButton onClick={handleBackClick}>
                <ListItemIcon>
                  <MenuOpenIcon fontSize="large" />
                </ListItemIcon>
                <Typography className="head-menu-option">
                  {t(CONTENT.SIDE.BACK)}
                </Typography>
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem className="menu-item collections">
              <ListItemButton onClick={handleCollectionsClick}>
                <ListItemIcon>
                  <PublicIcon fontSize="large" />
                </ListItemIcon>
                <Typography className="head-menu-option">
                  {t(CONTENT.SIDE.COLLECTIONS)}
                </Typography>
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem className="menu-item own-collections">
              <ListItemButton onClick={handleOwnCollectionsClick}>
                <ListItemIcon>
                  <CollectionsIcon fontSize="large" />
                </ListItemIcon>
                <Typography className="head-menu-option">
                  {t(CONTENT.SIDE.OWN_COLLECTIONS)}
                </Typography>
              </ListItemButton>
            </ListItem>
          </List>
          <List className="side-menu-footer">
            <ListItem className="menu-item" disablePadding>
              <ListItemButton onClick={handleAboutClick}>
                <ListItemIcon>
                  <InfoOutlinedIcon fontSize="large" fontWeight="bold" />
                </ListItemIcon>
                <Typography className="side-menu-option">
                  {t(CONTENT.SIDE.ABOUT)}
                </Typography>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
  );
};
