import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Indkobsliste from "./components/Indkobsliste";
import Profil from "./components/Profil";
import AddThings from "./pages/AddThings";
import Dashboard from "./pages/Dashboard";
import LogInSites from "./pages/LogInSites";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route index path="/" element={<LogInSites />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="dashboard/:id" element={<Dashboard />}>
          <Route path="profil" element={<Profil />} />
          <Route path="indkobsliste" element={<Indkobsliste />} />
        </Route>
        <Route path="/addThings/:id" element={<AddThings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
