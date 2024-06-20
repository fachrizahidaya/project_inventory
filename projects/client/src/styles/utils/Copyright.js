import { Link } from "react-router-dom";

import { Typography } from "@mui/material";

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit">Your Website</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
