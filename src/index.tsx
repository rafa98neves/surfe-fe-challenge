import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import Home from "./pages/Home";
import { StateProvider } from "./store/reducers";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <StateProvider>
      <Home />
    </StateProvider>
  </React.StrictMode>
);
