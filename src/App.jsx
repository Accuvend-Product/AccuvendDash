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

const PORTAL_TYPE = import.meta.env.VITE_PORTAL_TYPE



const SelectRoutes = () => {
    if(PORTAL_TYPE === PARTNER){
        return <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/partner-dashboard" element={<PartnerDashboard />} />
            <Route path={`${PARTNER_DASHBOARD_ROUTE }${PREFERENCES_ROUTE}`} element={<PartnerDashboardSettings />} />
            <Route path="/partner-dashboard/devcenter" element={<PartnerDevCenter />} />
            <Route path="/partner-dashboard/profile" element={<PartnerDashboardProfile />} />
            <Route path="/partner-dashboard/team-settings" element={<PartnerTeamSettings />} />
            <Route path="transaction/details/:id" element={<TransactionDetails />} /> 
            <Route path="/partner-dashboard/resolution-center" element={<ResolutionCenter/>} /> 
            <Route path="notifications" element={<Notification/>}/>

        </Routes> ;
    }else if(PORTAL_TYPE === CUSTOMERCARE){
        return <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path={`${CUSTOMER_CARE_ROUTE}${TRANSACTION_ROUTE}`} element={<CustomerDashboard/>} />
                <Route path={`${CUSTOMER_CARE_ROUTE}${EVENT_ROUTE}`} element={<CustomerCareEvents/>} />
                <Route path={`${CUSTOMER_CARE_ROUTE}${REPLAY_ROUTE}`} element={<CustomerCareReplays/>}/>
                <Route path="transaction/details/:id" element={<TransactionDetails />} /> 
                <Route path="notifications" element={<Notification/>}/>
        </Routes> ;
    }else if(PORTAL_TYPE === ADMIN){
        return <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path={`${ADMIN_ROUTE}${TRANSACTION_ROUTE}`} element={<AdminDashboard/>} />
            <Route path={`${ADMIN_ROUTE}${PARTNERS_ROUTE}`} element={<PartnersOverView/>} />
            <Route path={`${ADMIN_ROUTE}${PARTNERS_ROUTE}/:id${TRANSACTION_ROUTE}`} element={<PartnerTransctions/>} />
            <Route path={`${ADMIN_ROUTE}${SUPPORT_ROUTE}${EVENT_ROUTE}`} element={<CustomerCareEvents/>}/>
            <Route path={`${ADMIN_ROUTE}${SUPPORT_ROUTE}\overview`} element={<></>}/>
            <Route path="transaction/details/:id" element={<TransactionDetails />} /> 
            <Route path="notifications" element={<Notification/>}/>
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
            title = 'Administrator Care Portal'
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
                <ReactQueryDevtools initialIsOpen={false} />
            </TransactionDataProvider>
        </QueryClientProvider>
    );
}

export default App;
