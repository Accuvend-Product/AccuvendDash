import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";
import TransactionDetails from "./pages/transaction/transaction-details";
import PartnerDashboard from "./pages/partner/dashboard";

function App() {

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/partner-dashboard" element={<PartnerDashboard />} />
      <Route path="/transaction/details/:id" element={<TransactionDetails />} />
    </Routes>
  );
}

export default App;
