import React, { FC } from "react";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Card,
  ListItem,
  ListItemButton,
  ListItemIcon,
  List,
  ListItemText,
} from "@mui/material";
import { QuestionAnswer } from "@mui/icons-material";
import { IUser } from "../../../Types";

interface UserItemProps {
  id: string;
  name: string;
  avatarSrc: string;
  isInNetwork?: boolean;
}

export const users: IUser[] = [
  {
    id: "123",
    avatarSrc: "Безымянный.png",
    name: "Иван Иванов",
    isInNetwork: true,
  },
  {
    id: "435",
    avatarSrc: "samurai_katanas_warrior_204751_1024x768.jpg",
    name: "Андрей Смирнов",
    isInNetwork: true,
  },
  {
    id: "433",
    avatarSrc: "VK_Compact_Logo_(2021-present).svg.png",
    name: "Петр Петров",
    isInNetwork: false,
  },
  {
    id: "234",
    avatarSrc: "maxresdefault.jpg",
    name: "Сергей Кузнецов",
    isInNetwork: false,
  },
];

const UserItem: FC<UserItemProps> = ({ id, name, avatarSrc, isInNetwork }) => (
  <Link
    to={`/profile/${id}`}
    style={{
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "#111",
      marginBottom: 12,
    }}
  >
    <Box
      sx={{
        position: "relative",
        marginRight: 2,
        width: 50,
        height: 50,
      }}
    >
      <Avatar
        src={avatarSrc}
        alt={name}
        sx={{ width: 46, height: 46, borderRadius: "50%" }}
      />
      {isInNetwork && (
        <Box
          sx={{
            backgroundColor: "#4FB14F",
            border: "2px solid #F1F7FA",
            width: 12,
            height: 12,
            position: "absolute",
            bottom: 0,
            right: 0,
            borderRadius: "50%",
          }}
        />
      )}
    </Box>
    <span style={{ fontSize: 14 }}>{name}</span>
  </Link>
);

const UserItems: FC = () => {
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{
        padding: 2,
        backgroundColor: "background.paper",
      }}
    >
      {users.map((user) => (
        <UserItem
        key={user.id}
        id={user.id}
        name={user.name}
        avatarSrc={user.avatarSrc}
        isInNetwork={user.isInNetwork}
      />
      
      ))}

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/messages")}>
            <ListItemIcon>
              <QuestionAnswer />
            </ListItemIcon>
            <ListItemText primary="Сообщение" />
          </ListItemButton>
        </ListItem>
      </List>
    </Card>
  );
};

export default UserItems;
