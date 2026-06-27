import {

    FaHome,

    FaUsers,

    FaDoorOpen,

    FaMoneyBillWave,

    FaWallet,

    FaChartLine

} from "react-icons/fa";

import { StatCard } from "@/components/common";

import { formatCurrency } from "@/utils/currency";

export default function DashboardStats({

    statistics

}) {

    const cards = [

        {

            title: "Total Houses",

            value:

                statistics?.total_houses ?? 0,

            icon: <FaHome size={28} />

        },

        {

            title: "Occupied",

            value:

                statistics?.occupied_houses ?? 0,

            icon: <FaUsers size={28} />

        },

        {

            title: "Vacant",

            value:

                statistics?.vacant_houses ?? 0,

            icon: <FaDoorOpen size={28} />

        },

        {

            title: "Income",

            value: formatCurrency(

                statistics?.monthly_income

            ),

            icon:

                <FaMoneyBillWave size={28} />

        },

        {

            title: "Expense",

            value: formatCurrency(

                statistics?.monthly_expense

            ),

            icon:

                <FaWallet size={28} />

        },

        {

            title: "Balance",

            value: formatCurrency(

                statistics?.balance

            ),

            icon:

                <FaChartLine size={28} />

        }

    ];

    return (

        <div

            className="

                grid

                gap-5

                grid-cols-1

                md:grid-cols-2

                xl:grid-cols-3

                mb-8

            "

        >

            {

                cards.map((card) => (

                    <StatCard

                        key={card.title}

                        title={card.title}

                        value={card.value}

                        icon={card.icon}

                    />

                ))

            }

        </div>

    );

}