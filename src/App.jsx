import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import SearchParams from "./components/SearchParams";
import WrappedDetails from "./components/Details";
import "./App.css";
import ThemeContext from "./components/ThemeContext";
import { useState } from "react";

function App() {
  const theme = useState("green");
  return (
    <ThemeContext.Provider value={theme}>
      <BrowserRouter>
        <header>
          <Link to="/">
            <h1>Adopt me!</h1>
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<SearchParams />} />
          <Route path="/details/:id" element={<WrappedDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
