import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";
import TransactionDetails from "./pages/transaction/transaction-details";
import PartnerDashboard from "./pages/partner/dashboard";
import PartnerTransactionDetails from "./pages/partner/transaction-details";
import PartnerDashboardSettings from "./pages/partner/dashboard-settings";
import PartnerDevCenter from "./pages/partner/dev-center";

function App() {

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/partner-dashboard" element={<PartnerDashboard />} />
      <Route path="/partner-dashboard/settings" element={<PartnerDashboardSettings />} />
      <Route path="/partner-dashboard/devcenter" element={<PartnerDevCenter />} />
      <Route path="/transaction/details/:id" element={<TransactionDetails />} />
      <Route path="/partner/transaction/details/:id" element={<PartnerTransactionDetails />} />
    </Routes>
  );
}

export default App;
