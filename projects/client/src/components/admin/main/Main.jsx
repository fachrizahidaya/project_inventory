import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Grid, IconButton, Paper, Toolbar } from "@mui/material";
import {
  AdminPanelSettingsOutlined,
  AssignmentOutlined,
  CategoryOutlined,
  DashboardOutlined,
  DoorSlidingOutlined,
  Inventory2Outlined,
  LogoutOutlined,
  PeopleOutline,
  PersonOutline,
  SplitscreenOutlined,
} from "@mui/icons-material";

import Content from "../../../styles/container/Content";
import LeftContainer from "../../../styles/tabs/LeftContainer";
import TopContainer from "../../../styles/tabs/TopContainer";
import { logout } from "../../../redux/admin";

const Main = ({ children, icon, title }) => {
  const [open, setOpen] = useState(true);
  const [listSelected, setListSelected] = useState(null);

  const { isSuper } = useSelector((state) => state.admin.value);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mainListItems = isSuper
    ? [
        { title: "Dashboard", icon: <DashboardOutlined />, onClick: () => navigate("/dashboard") },
        { title: "Admins", icon: <AdminPanelSettingsOutlined />, onClick: () => navigate("/admin") },
        { title: "Orders", icon: <AssignmentOutlined />, onClick: () => navigate("/order") },
        { title: "Racks", icon: <DoorSlidingOutlined />, onClick: () => navigate("/rack") },
        { title: "Rows", icon: <SplitscreenOutlined />, onClick: () => navigate("/row") },
        { title: "Categories", icon: <CategoryOutlined />, onClick: () => navigate("/category") },
        { title: "Items", icon: <Inventory2Outlined />, onClick: () => navigate("/item") },
        { title: "Divisions", icon: <PeopleOutline />, onClick: () => navigate("/division") },
      ]
    : [
        { title: "Dashboard", icon: <DashboardOutlined />, onClick: () => navigate("/dashboard") },
        { title: "Orders", icon: <AssignmentOutlined />, onClick: () => navigate("/order") },
        { title: "Racks", icon: <DoorSlidingOutlined />, onClick: () => navigate("/rack") },
        { title: "Rows", icon: <SplitscreenOutlined />, onClick: () => navigate("/row") },
        { title: "Categories", icon: <CategoryOutlined />, onClick: () => navigate("/category") },
        { title: "Items", icon: <Inventory2Outlined />, onClick: () => navigate("/item") },
        { title: "Users", icon: <PersonOutline />, onClick: () => navigate("/user") },
      ];

  const secondaryListItems = [{ title: "Logout", icon: <LogoutOutlined />, onClick: () => logoutHandler() }];

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleSetBgColorItem = () => {};

  const logoutHandler = async () => {
    dispatch(logout());

    localStorage.removeItem("admin_token");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <TopContainer onToggle={toggleDrawer} open={open} title={title}>
        <IconButton color="inherit">{icon}</IconButton>
      </TopContainer>

      <LeftContainer
        onToggle={toggleDrawer}
        open={open}
        mainListItems={mainListItems}
        secondaryListItems={secondaryListItems}
      />

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
            <Paper sx={{ p: 2 }}>{children}</Paper>
          </Grid>
        </Content>
      </Box>
    </Box>
  );
};

export default Main;
