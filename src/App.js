import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Indkobsliste from "./components/Indkobsliste";
import Profil from "./components/Profil";
import { CurrentUserContext } from "./context/CurrentUserContext";
import AddThings from "./pages/AddThings";
import AdminPage from "./pages/AdminPage";
import Dashboard from "./pages/Dashboard";
import LogInSites from "./pages/LogInSites";
import ShopList from "./pages/ShopList";
import SignUp from "./pages/SignUp";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <BrowserRouter className="App">
        <Routes>
          <Route index path="/" element={<LogInSites />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="dashboard/:id" element={<Dashboard />}>
            <Route path="profil" element={<Profil />} />
            <Route path="indkobsliste" element={<Indkobsliste />} />
            <Route path="adminPage/:id" element={<AdminPage />} />
          </Route>
          <Route path="/addThings/:id" element={<AddThings />} />
          <Route path="/shopList" element={<ShopList />} />
        </Routes>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
