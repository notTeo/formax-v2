import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ConsentProvider } from "./context/ConsentContext.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./styles/variables.css";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ConsentProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </ConsentProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
