import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const ItemTab = ({ children, title, onClick }) => {
  return (
    <ListItem onClick={onClick}>
      <ListItemButton>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
};

export default ItemTab;
