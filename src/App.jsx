import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import SearchParams from "./components/SearchParams";
import WrappedDetails from "./components/Details";


function App() {
  return (
    <BrowserRouter>
      <Link to="/">
        <h1>Adopt me!</h1>
      </Link>
      <Routes>
        <Route path="/" element={<SearchParams />} />
        <Route path="/details/:id" element={<WrappedDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
