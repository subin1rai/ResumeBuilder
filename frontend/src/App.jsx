import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserProvider from "./context/UserContext";
import Dashboard from "./pages/Dashboard";
import BuildResume from "./components/BuildResume";
function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/resume/:resumeId" element={<BuildResume />} /> 
      </Routes>
    </UserProvider>
  );
}

export default App;
