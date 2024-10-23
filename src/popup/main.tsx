import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Popup from "./Popup.tsx";
import "../global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Popup />
  </StrictMode>,
);
