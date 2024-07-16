import React from "react";
import ReactDOM from "react-dom/client";
import Master from "./Master";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Master />
  </React.StrictMode>
);
