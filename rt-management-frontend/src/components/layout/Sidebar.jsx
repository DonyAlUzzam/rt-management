import {
    FaHome,
    FaUsers,
    FaBuilding,
    FaFileInvoiceDollar,
    FaMoneyCheckAlt,
    FaWallet,
    FaChartBar,
    FaSignOutAlt
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const menus = [

    {
        name: "Dashboard",
        icon: <FaHome />,
        path: "/dashboard"
    },

    {
        name: "Residents",
        icon: <FaUsers />,
        path: "/residents"
    },

    {
        name: "Houses",
        icon: <FaBuilding />,
        path: "/houses"
    },

    {
        name: "Billing",
        icon: <FaFileInvoiceDollar />,
        path: "/billings"
    },

    {
        name: "Payments",
        icon: <FaMoneyCheckAlt />,
        path: "/payments"
    },

    {
        name: "Expenses",
        icon: <FaWallet />,
        path: "/expenses"
    },

    {
        name: "Reports",
        icon: <FaChartBar />,
        path: "/reports"
    }

];

export default function Sidebar() {

    return (

        <aside
            className="
                w-64
                bg-slate-900
                text-white
                min-h-screen
                fixed
                left-0
                top-0
            "
        >

            <div
                className="
                    text-center
                    py-6
                    text-2xl
                    font-bold
                    border-b
                    border-slate-700
                "
            >

                RT Management

            </div>

            <nav className="mt-5">

                {

                    menus.map(menu => (

                        <NavLink

                            key={menu.path}

                            to={menu.path}

                            className={({ isActive }) =>

                                `

                                flex

                                items-center

                                gap-3

                                px-6

                                py-3

                                hover:bg-slate-800

                                ${isActive ? "bg-blue-600" : ""}

                                `
                            }

                        >

                            {menu.icon}

                            {menu.name}

                        </NavLink>

                    ))

                }

            </nav>

            <div className="absolute bottom-0 w-full">

                <button
                    className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-6
                        py-4
                        hover:bg-red-600
                    "
                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

        </aside>

    );

}