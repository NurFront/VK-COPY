import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  ListItem,
  ListItemButton,
  ListItemIcon,
  List,
  ListItemText,
} from "@mui/material";
import { menu } from "./dataMenu";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{
        padding: 2,
        backgroundColor: "background.paper",
        border: "none",
        borderRadius: 3,
        marginTop: 3,
        marginBottom: 10,
      }}
    >
      <List>
        {menu.map((item) => (
          <ListItem key={item.link} disablePadding>
            <ListItemButton onClick={() => navigate(item.link)}>
              <ListItemIcon
                sx={{
                  minWidth: 36,
                }}
              >
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.title}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default Menu;
