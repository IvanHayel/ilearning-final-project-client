import {Link, Typography} from "@mui/material";
import React              from "react";

export const Copyright = () => (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/IvanHayel" target="_blank">
        Hayel I.D.
      </Link>
      {` ${new Date().getFullYear()}.`}
    </Typography>
);
