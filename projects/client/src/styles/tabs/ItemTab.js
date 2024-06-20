import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const ItemTab = ({ children, title, navigation, navigate }) => {
  return (
    <ListItem onClick={() => navigate(navigation)}>
      <ListItemButton>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
};

export default ItemTab;
