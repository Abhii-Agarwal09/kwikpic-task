/* eslint-disable no-console */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { io } from "socket.io-client";

export const initSocket = async () => {
  const token = localStorage.getItem("token").split(" ")[1];
  const options = {
    transports: ["websocket"],
    upgrade: false,
    rejectUnauthorized: false,
    forceNew: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,
    timeout: 20000,
    autoConnect: true,
    query: { token },
  };
  let socket = io(process.env.REACT_APP_API_URL, options);
  return socket;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
