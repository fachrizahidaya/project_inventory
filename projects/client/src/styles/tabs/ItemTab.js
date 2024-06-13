import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const ItemTab = ({ children, title }) => {
  return (
    <ListItemButton>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  );
};

export default ItemTab;
