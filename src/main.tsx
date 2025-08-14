import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RouteContainer from "./route/RouteContainer.tsx";
import "../src/css/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouteContainer />
  </StrictMode>
);
