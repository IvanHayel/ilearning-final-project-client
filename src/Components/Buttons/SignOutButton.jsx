import LogoutIcon    from "@mui/icons-material/Logout";
import {IconButton}  from "@mui/material";
import React         from "react";
import {useNavigate} from "react-router-dom";
import {ROUTE_URL}   from "../../Constants";
import {signOut}     from "../../Services";

export const SignOutButton = () => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOut();
    navigate(ROUTE_URL.HOME);
  };
  return (
      <IconButton
          variant="outlined"
          color="inherit"
          size="medium"
          onClick={handleSignOut}
      >
        <LogoutIcon fontSize="large" />
      </IconButton>
  );
};
