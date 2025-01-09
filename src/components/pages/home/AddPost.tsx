import { Alert, Box, TextField } from "@mui/material";
import React, { FC, useState } from "react";
import { IPost, TypeSetState } from "../../../Types";
import { users } from "../../layout/sidebar/UserItems";
import { useAuth } from "../../providers/useAuth";
import { error } from "console";
import { addDoc, collection } from "firebase/firestore";


const AddPost: FC = () => {
  const [content, setContent] = useState("");
  const { user, db } = useAuth();
  const [error, setError] = useState("");

  const addPostHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && user) {
      try {
        await addDoc(collection(db, "posts"), {
          author: user,
          content,
          createdAt: '10 минут назад'
        });
      } catch (e: any) {
        setError(e);
      }

      setContent("");
    }
  };

  return (
    <>
      {error && (
        <Alert severity="error" style={{ marginBottom: 20 }}>
          {error}
        </Alert>
      )}
      <div>
        <Box
          sx={{
            border: "1px solid #e2e2e2",
            borderRadius: "25px",
          }}
        >
          <TextField
            label="Расскажи, что у тебя нового"
            variant="outlined"
            InputProps={{
              sx: { borderRadius: "25px", backgroundColor: "#F9F9F9" },
            }}
            sx={{
              width: "100%",
            }}
            onKeyPress={addPostHandler}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </Box>
      </div>
    </>
  );
};

export default AddPost;
