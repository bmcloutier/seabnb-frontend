import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import App from "./App.jsx";
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </StrictMode>
);
