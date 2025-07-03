// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Global styles
import "./styles/globals.css";

// Component-specific styles
import "./styles/components/auth.css";
import "./styles/components/content.css";
import "./styles/components/forms.css";

// Theme styles
import "./styles/themes/dark.css";
import "./styles/themes/purple-gradient.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
