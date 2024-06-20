import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Grid, IconButton, Paper, Toolbar } from "@mui/material";
import Content from "../../../styles/container/Content";
import LeftContainer from "../../../styles/tabs/LeftContainer";
import TopContainer from "../../../styles/tabs/TopContainer";

const Main = ({ children, icon, title }) => {
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <TopContainer onToggle={toggleDrawer} open={open} title={title}>
        <IconButton color="inherit">{icon}</IconButton>
      </TopContainer>

      <LeftContainer onToggle={toggleDrawer} open={open} navigate={navigate} />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Content>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: 240 }}>{children}</Paper>
          </Grid>
        </Content>
      </Box>
    </Box>
  );
};

export default Main;
