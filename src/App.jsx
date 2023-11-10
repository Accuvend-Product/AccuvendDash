import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";

function App() {

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
