import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProvidedUser } from "./contexts/DefaultUser";

ReactDOM.render(
  <React.StrictMode>
    <ProvidedUser>
      <App />
    </ProvidedUser>
  </React.StrictMode>,
  document.getElementById("root")
);
