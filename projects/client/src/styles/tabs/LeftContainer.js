import { Fragment } from "react";
import { Divider, IconButton, List, Toolbar, styled } from "@mui/material";
import {
  AssignmentOutlined,
  ChevronLeft,
  DashboardOutlined,
  DoorSlidingOutlined,
  Inventory2Outlined,
  PersonOutline,
} from "@mui/icons-material";
import MuiDrawer from "@mui/material/Drawer";
import ItemTab from "./ItemTab";

const LeftContainer = ({ onToggle, open, navigate }) => {
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

  const mainListItems = [
    { title: "Dashboard", icon: <DashboardOutlined />, navigate: "/dashboard" },
    { title: "Orders", icon: <AssignmentOutlined />, navigate: "/order" },
    { title: "Racks", icon: <DoorSlidingOutlined />, navigate: "/rack" },
    { title: "Items", icon: <Inventory2Outlined />, navigate: "/item" },
    { title: "Users", icon: <PersonOutline />, navigate: "/user" },
  ];

  // const secondaryList = <Fragment></Fragment>;

  const mainList = (
    <Fragment>
      {mainListItems.map((item, index) => {
        return (
          <ItemTab key={index} title={item.title} navigation={item.navigate} navigate={navigate}>
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
      </List>
    </Drawer>
  );
};

export default LeftContainer;
