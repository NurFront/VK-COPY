import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./components/routes/Routes";
import { initializeApp } from "firebase/app";
import { AuthProvider } from "./components/providers/AuthProvider";

const firebaseConfig = {
  apiKey: "AIzaSyAHMjT1FDuJ74oEKIUxldjsR3h52WxDfVc",
  authDomain: "nurfrontendsky444.firebaseapp.com",
  projectId: "nurfrontendsky444",
  storageBucket: "nurfrontendsky444.firebasestorage.app",
  messagingSenderId: "627756415912",
  appId: "1:627756415912:web:3807c88118e7b82ac7bb9d",
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
</React.StrictMode>
);
