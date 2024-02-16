import { useState, useEffect } from "react";
import Erp from "./icons/erp.jsx";
import {
  Cpu,
  HelpCircle,
  LayoutDashboard,
  LogOutIcon,
  User,
  ArrowRightLeft,
  Package,
} from "lucide-react";




import Replay from "./icons/replay.jsx";
import MessageQuestion from "./icons/messagequestion.jsx";
import { ADMIN_ROUTE, CUSTOMER_CARE_ROUTE, EVENT_ROUTE, PARTNERS_ROUTE, REPLAY_ROUTE, SUPPORT_ROUTE, TRANSACTION_ROUTE } from "../Routes.js";
import { CUSTOMERCARE, PARTNER , ADMIN , CUSTOMER } from "../Constants.js";
import { useLogout } from "../hooks/utilityHooks.js";
import Profile2Users from "./icons/profile2user.jsx";

export const ParnterLinks = [

    {
      name: "DASHBOARD",
      icon: <LayoutDashboard className="h-5 w-5 mr-2 text-2xl" />,
      href: "/partner-dashboard",
      active: false,
    },
    {
      name: "PROFILE",
      icon: <User className="h-5 w-5 mr-2" />,
      href: "/partner-dashboard/profile",
      active: false,
    },
    {
      name: "RESOLUTION CENTER",
      icon: <HelpCircle className="h-5 w-5 mr-2" />,
      href: "/partner-dashboard/resolution-center",
      active: false,
    },
    {
      name: "DEV CENTER",
      icon: <Cpu className="h-5 w-5 mr-2" />,
      href: "/partner-dashboard/devcenter",
      active: false,
    },
  ];
  
  export const CustomerCareLinks = [
      {
          name: "TRANSACTIONS",
          icon: <ArrowRightLeft className="h-5 w-5 mr-2 text-2xl" />,
          href: `${CUSTOMER_CARE_ROUTE}${TRANSACTION_ROUTE}`,
          active: false,
      },
      { 
          name: "EVENTS",
          icon: <MessageQuestion className="h-5 w-5 mr-2 text-2xl" />,
          href: `${CUSTOMER_CARE_ROUTE}${EVENT_ROUTE}`,
          active: false,
      },
      // {
      //     name: "MY REPLAYS",
      //     icon: <Replay className="h-5 w-5 mr-2 text-2xl" />,
      //     href: `${CUSTOMER_CARE_ROUTE}${REPLAY_ROUTE}`,
      //     active: false,
      // },
      {
        icon: <HelpCircle className="h-5 w-5 mr-2" />,
        active: false,
        name: "RESOLUTION CENTER",
        href: "/resolution-center"
      },
  
  ] ; 
  export const AdminLinks = [
    {
      name: "TRANSACTIONS",
      icon: <ArrowRightLeft className="h-5 w-5 mr-2 text-2xl" />,
      href: `${ADMIN_ROUTE}${TRANSACTION_ROUTE}`,
      active: false,
    },
    {
      name: "PARTNERS",
      icon: <Profile2Users className="h-5 w-5 mr-2 text-2xl" />,
      href: `${ADMIN_ROUTE}${PARTNERS_ROUTE}`,
      active: false,
    },
    {
      name: "CUSTOMER SUPPORT",
      icon: <MessageQuestion className="h-5 w-5 mr-2 text-2xl" />,
      href: `#`,
      active: false,
      subLinks: [
        // {
        //   name: "OVERVIEW",
        //   href: `${ADMIN_ROUTE}${SUPPORT_ROUTE}/overview`,
        //   active: false,
        // },
        {
          name: "RESOLUTION CENTER",
          href: "/resolution-center"
        },
        {
          name: "CUSTOMER CARE AGENTS",
          href: "/resolution-center"
        },
        {
          name: "EVENTS",
          href: `${ADMIN_ROUTE}${SUPPORT_ROUTE}${EVENT_ROUTE}`,
          active: false,
        }
      ]
    },
    {
      name: "ERP",
      icon: <Erp className="h-6 w-6 mr-2 text-2xl"/>,
      href: `https://one.zoho.com/zohoone/accuvend/`,
      active: false,
      blank: true,
    },

    {
      name: "PRODUCTS",
      // icon: <Erp className="h-6 w-6 mr-2 text-2xl"/>,
      icon: <Package strokeWidth={1} className="h-6 w-6 mr-2 text-2xl"/>, 
      href: `/admin/products`,
      active: false,
    },
  
  ] ;
  
  
  export const CustomerLinks = [
    {
      name: "TRANSACTIONS",
      icon: <ArrowRightLeft className="h-5 w-5 mr-2 text-2xl" />,
      href: `/transactions`,
      active: false,
    },
  ] ;