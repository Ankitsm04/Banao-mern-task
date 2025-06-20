import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Filter from "./pages/Filter";
import Navbar from "./components/Navbar";
import "./App.css";

function AppWrapper() {
  const location = useLocation();
  const hideNavbarOn = ["/"]; 

  const showNavbar = !hideNavbarOn.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/filter" element={<Filter />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
