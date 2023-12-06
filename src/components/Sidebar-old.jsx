import { ArrowRightLeft, HelpCircle, Settings, Users2 } from "lucide-react"
import Erp from "./icons/erp"

const links = [
    {
        name: "TRANSACTIONS",
        icon: <ArrowRightLeft className="h-5 w-5 mr-2" />,
        active: true,
        href: "/transactions",
    },
    {
        name: "PARTNERS",
        icon: <Users2 className="h-5 w-5 mr-2" />,
        active: false,
        href: "/partner-dashboard",
    },
    {
        name: "CUSTOMER SUPPORT",
        icon: <HelpCircle className="h-5 w-5 mr-2" />,
        active: false,
        href: "/support",
    },
    {
        name: "ERP",
        icon: <Erp />,
        active: false,
        href: "/erp",
    },
]

const Sidebar = () => {
    return (
        <div className="min-h-screen flex">
            <div className="w-[372px] h-full overflow-hidden border-r border-body1 flex flex-col justify-between">
                <div className="flex flex-col pt-8 space-y-4 px-8 sm:px-10 md:px-12">
                    {links.map((link) => (
                        <a href={link.href} className={`flex items-center hover:text-primary ${link.active ? 'text-primary' : 'text-black'}`} key={link.name}>
                            {link.icon}
                            <p className="text-2xl">{link.name}</p>
                        </a>
                    ))}

                </div>
                {/* horizontal separator */}
                <div className="sm:px-10 md:px-12 pb-8">
                    <a href="/settings" className={`flex items-center text-black hover:text-primary`}>
                        <Settings className="mr-2 h-5 w-5" />
                        <p className="text-2xl">SETTINGS</p>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Sidebar