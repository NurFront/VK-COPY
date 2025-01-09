import { Avatar, Button, Card, Chip } from "@mui/material";
import React from "react";
import { useAuth } from "../../providers/useAuth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const User = () => {
  const { user, ga } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(ga);
      navigate("/auth");
    } catch (error) {
      console.error("Ошибка выхода:", error);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        padding: 2,
        backgroundColor: "F1F7FA",
        border: "none",
        borderRadius: 3,
        marginBottom: 5,
      }}
    >
      <Chip
        avatar={<Avatar alt="" src={user?.avatarSrc} />}
        label={user?.name || "Без имени"}
        variant="outlined"
        sx={{ display: "flex", marginBottom: 2 }}
      />
      <Button variant="outlined" onClick={handleLogout}>
        Выйти
      </Button>
    </Card>
  );
};

export default User;
