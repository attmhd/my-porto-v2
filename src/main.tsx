import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";

import { ThemeProvider } from "./contexts/ThemeContext";
import { PortfolioProvider } from "./contexts/PortfolioContext";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <PortfolioProvider>
          <App />
        </PortfolioProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
