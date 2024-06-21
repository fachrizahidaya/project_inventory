import { Fragment } from "react";

import { Divider, IconButton, List, Toolbar, styled } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

import MuiDrawer from "@mui/material/Drawer";
import ItemTab from "./ItemTab";

const LeftContainer = ({ onToggle, open, mainListItems, secondaryListItems }) => {
  const drawerWidth = 240;

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  const mainList = (
    <Fragment>
      {mainListItems.map((item, index) => {
        return (
          <ItemTab key={index} title={item.title} onClick={item.onClick}>
            {item.icon}
          </ItemTab>
        );
      })}
    </Fragment>
  );

  const secondaryList = (
    <Fragment>
      {secondaryListItems.map((item, index) => {
        return (
          <ItemTab key={index} title={item.title} onClick={item.onClick}>
            {item.icon}
          </ItemTab>
        );
      })}
    </Fragment>
  );

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={onToggle}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {mainList}
        <Divider sx={{ my: 1 }} />
        {secondaryList}
      </List>
    </Drawer>
  );
};

export default LeftContainer;
