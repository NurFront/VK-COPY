import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../../providers/useAuth";
import { IMessage, IPost } from "../../../Types";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { Alert, Card, Grid, List, ListItem, ListItemText } from "@mui/material";

const Messages: FC = () => {
  const { user, db } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "messages"), (doc) => {
      doc.forEach((d: any) => {
        setMessages((prev) => [...prev, d.data()]);
      });
    });

    return () => {
      unsub();
    };
  }, [db]);

  const addMessageHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await addDoc(collection(db, "messages"), {
        user,
        message,
      });
    } catch (e: any) {
      setError(e);
    }

    setMessage("");
  };

  return (
    <>
      {error && (
        <Alert severity="error" style={{ marginBottom: 20 }}>
          {error}
        </Alert>
      )}
      <Card>
      <h1>Messages to NUR-FRONT</h1>
      </Card>
    </>
  );
};

export default Messages;
