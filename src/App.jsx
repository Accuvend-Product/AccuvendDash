import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";
import PartnerDashboard from "./pages/partner/dashboard";
import TransactionDetails from "./pages/transaction-details";
import PartnerDashboardSettings from "./pages/partner/dashboard-settings";
import PartnerDevCenter from "./pages/partner/dev-center";
import PartnerDashboardProfile from "./pages/partner/profile";
import PartnerTeamSettings from "./pages/partner/team-members-settings";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { TransactionDataProvider } from "./contexts/transaction-context";
import { ADMIN_ROUTE, CUSTOMER_CARE_ROUTE, EVENT_ROUTE, PARTNERS_ROUTE, PARTNER_DASHBOARD_ROUTE , PREFERENCES_ROUTE, REPLAY_ROUTE, SUPPORT_ROUTE, TRANSACTION_ROUTE } from "./Routes";
import CustomerCareEvents from "./pages/customercare/CustomerCareEvents";
import CustomerCareReplays from "./pages/customercare/CustomerCareReplays";
import PartnersOverView from "./pages/admin/PartnersOverView";
import AdminDashboard from "./pages/admin/dashboard";
import CustomerDashboard from "./pages/customercare/dashboard";
export const queryClient = new QueryClient()
import { ADMIN, CUSTOMER, CUSTOMERCARE, PARTNER } from "./Constants";
import PartnerTransctions from "./pages/admin/partner-transactions";
import CustomerTransactionDetails from "./pages/customer/customer-transaction-details";
import ResolutionCenter from "./pages/partner/resolution-center";
import Notification from "./pages/Notification";
import SingleSupportPage from "./pages/partner/SingleSupportPage";
import RequireAuth from "./components/RequireAuth";
import AdminSignIn from "./pages/adminsignin";

const PORTAL_TYPE = import.meta.env.VITE_PORTAL_TYPE



const SelectRoutes = () => {
    if(PORTAL_TYPE === PARTNER){
        return <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/partner-dashboard" element={<RequireAuth><PartnerDashboard /></RequireAuth>} />
            <Route path={`${PARTNER_DASHBOARD_ROUTE }${PREFERENCES_ROUTE}`} element={<RequireAuth><PartnerDashboardSettings /></RequireAuth>} />
            <Route path="/partner-dashboard/devcenter" element={<RequireAuth><PartnerDevCenter /></RequireAuth>} />
            <Route path="/partner-dashboard/profile" element={<RequireAuth><PartnerDashboardProfile /></RequireAuth>} />
            <Route path="/partner-dashboard/team-settings" element={<RequireAuth><PartnerTeamSettings /></RequireAuth>} />
            <Route path="transaction/details/:id" element={<RequireAuth><TransactionDetails /></RequireAuth>} /> 
            <Route path="/partner-dashboard/resolution-center" element={<RequireAuth><ResolutionCenter/></RequireAuth>} /> 
            <Route path="notifications" element={<RequireAuth><Notification/></RequireAuth>}/>
            <Route path="/ticket/:id" element={<RequireAuth><SingleSupportPage/></RequireAuth>}/>
        </Routes> ;
    }else if(PORTAL_TYPE === CUSTOMERCARE){
        return <Routes>
                <Route path="/" element={<AdminSignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path={`${CUSTOMER_CARE_ROUTE}${TRANSACTION_ROUTE}`} element={<RequireAuth><CustomerDashboard/></RequireAuth>} />
                <Route path={`${CUSTOMER_CARE_ROUTE}${EVENT_ROUTE}`} element={<RequireAuth><CustomerCareEvents/></RequireAuth>} />
                <Route path={`${CUSTOMER_CARE_ROUTE}${REPLAY_ROUTE}`} element={<RequireAuth><CustomerCareReplays/></RequireAuth>}/>
                <Route path="transaction/details/:id" element={<RequireAuth><TransactionDetails /></RequireAuth>} /> 
                <Route path="notifications" element={<RequireAuth><Notification/></RequireAuth>}/>
                <Route path="/resolution-center" element={<RequireAuth><ResolutionCenter/></RequireAuth>} /> 
                <Route path="/ticket/:id" element={<RequireAuth><SingleSupportPage/></RequireAuth>}/>
        </Routes> ;
    }else if(PORTAL_TYPE === ADMIN){
        return <Routes>
            <Route path="/" element={<AdminSignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path={`${ADMIN_ROUTE}${TRANSACTION_ROUTE}`} element={<RequireAuth><AdminDashboard/></RequireAuth>} />
            <Route path={`${ADMIN_ROUTE}${PARTNERS_ROUTE}`} element={<RequireAuth><PartnersOverView/></RequireAuth>} />
            <Route path={`${ADMIN_ROUTE}${PARTNERS_ROUTE}/:id${TRANSACTION_ROUTE}`} element={<RequireAuth><PartnerTransctions/></RequireAuth>} />
            <Route path={`${ADMIN_ROUTE}${SUPPORT_ROUTE}${EVENT_ROUTE}`} element={<RequireAuth><CustomerCareEvents/></RequireAuth>}/>
            <Route path={`${ADMIN_ROUTE}${SUPPORT_ROUTE}\overview`} element={<></>}/>
            <Route path="transaction/details/:id" element={<RequireAuth><TransactionDetails /></RequireAuth>} /> 
            <Route path="notifications" element={<RequireAuth><Notification/></RequireAuth>}/>
            <Route path="/resolution-center" element={<RequireAuth><ResolutionCenter/></RequireAuth>} /> 
            <Route path="/ticket/:id" element={<RequireAuth><SingleSupportPage/></RequireAuth>}/>
        </Routes>
        ;
    }else if(PORTAL_TYPE === CUSTOMER){
        return <Routes>
            <Route path={`${ADMIN_ROUTE}${TRANSACTION_ROUTE}`} element={<></>} />
            <Route path="transaction/details/:id" element={<CustomerTransactionDetails />} /> 
        </Routes>
        ;
    }else{
        return <></> ;
    }
}
function App() {

    useEffect(() => {
        let title = ''
        if(PORTAL_TYPE === CUSTOMERCARE){
            title = 'Customer Care Portal'
        }else if(PORTAL_TYPE === ADMIN){
            title = 'Administrator Portal'
        }else if(PORTAL_TYPE === PARTNER) {
            title = 'Partner Portal'
        }else{
            title = 'Accuvend'
        }
        document.title = title;
      }, []);

    return (

        <QueryClientProvider client={queryClient}>
            <TransactionDataProvider>
                <SelectRoutes/>
                <Toaster />
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </TransactionDataProvider>
        </QueryClientProvider>
    );
}

export default App;
