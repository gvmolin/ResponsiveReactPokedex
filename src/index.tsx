import React from "react";
import ReactDOM from "react-dom/client";
import "./utils/style/index.scss";
import AppRouter from "./router/router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);