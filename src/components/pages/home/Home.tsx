import React, { useState } from "react";
import AddPost from "./AddPost";
import Posts from "./Posts";
import { Box } from "@mui/material";

const Home = () => {

  return (
    <Box>
      <AddPost />
      <Posts />
    </Box>
  );
};

export default Home;
