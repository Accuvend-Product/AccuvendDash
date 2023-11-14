import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Cpu, HelpCircle, LayoutDashboard, Settings, User } from "lucide-react";

const Sidebar = () => {
  const [links, setLinks] = useState([
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
      href: "/resolution-center",
      active: false,
    },
    {
      name: "DEV CENTER",
      icon: <Cpu className="h-5 w-5 mr-2" />,
      href: "/partner-dashboard/devcenter",
      active: false,
    },
  ]);

  const location = useLocation();

  useEffect(() => {
    // Update the links based on the current location
    setLinks((prevLinks) =>
      prevLinks.map((link) => ({
        ...link,
        active: location.pathname === link.href,
      }))
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-[372px] h-full overflow-hidden border-r border-body1 flex flex-col justify-between">
        <div className="flex flex-col pt-8 space-y-4 px-4 md:px-8 lg:px-10 xl:px-12">
          {links.map((link) => (
            <a
              href={link.href}
              className={`flex items-center hover:text-primary ${
                link.active ? "text-primary" : "text-black"
              }`}
              key={link.name}
            >
              {link.icon}
              <p className="text-lg md:text-2xl">{link.name}</p>
            </a>
          ))}
        </div>
        <div className="px-4 md:px-8 lg:px-10 xl:px-12 pb-8">
          <a
            href="/settings"
            className={`flex items-center text-black hover:text-primary`}
          >
            <Settings className="mr-2 h-5 w-5" />
            <p className="text-lg md:text-2xl">SETTINGS</p>
          </a>
        </div>
      </div>
    </div>
  );
};


export default Sidebar;
