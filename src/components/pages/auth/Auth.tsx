import { ButtonGroup, Button, TextField, Grid, Alert } from "@mui/material";
import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { IUserData } from "./types";
import { useAuth } from "../../providers/useAuth";
import { useNavigate } from "react-router-dom";

const Auth: FC = () => {
  const { ga, user } = useAuth();

  const [isRegForm, setIsRegForm] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  } as IUserData);
  const [error, setError] = useState("");

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegForm) {
        // Регистрация
        const res = await createUserWithEmailAndPassword(
          ga,
          userData.email,
          userData.password
        );

        await updateProfile(res.user, {
          displayName: userData.name,
        });
      } else {
        // Вход
        await signInWithEmailAndPassword(ga, userData.email, userData.password);
      }
      setUserData({ email: "", password: "", name: "" });
    } catch (error: any) {
      setError(error.message || "An error occurred");
      setUserData({ email: "", password: "", name: "" });
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      {error && (
        <Alert severity="error" style={{ marginBottom: 20 }}>
          {error}
        </Alert>
      )}
      <Grid display="flex" justifyContent="center" alignItems="center">
        <form onSubmit={handleLogin}>
          <TextField
            label="Name"
            variant="outlined"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            sx={{ display: "block", marginBottom: 3 }}
          />
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            value={userData.email}
            required
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            sx={{ display: "block", marginBottom: 3 }}
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            value={userData.password}
            required
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            sx={{ display: "block", marginBottom: 3 }}
          />
          <ButtonGroup variant="outlined">
            <Button type="submit" onClick={() => setIsRegForm(false)}>
              Auth
            </Button>
            <Button type="submit" onClick={() => setIsRegForm(true)}>
              Register
            </Button>
          </ButtonGroup>
        </form>
      </Grid>
    </>
  );
};

export default Auth;
