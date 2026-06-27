import {

    DataTable as Table,

    Button

} from "@/components/common";

import BillingStatusBadge from "./BillingStatusBadge";

import {

    formatCurrency

} from "@/utils/currency";

export default function BillingTable({

    data = [],

    loading

}) {

    const columns = [

        {

            key: "house",

            title: "House",

            render: (row) => (

                row.house?.house_number

            )

        },

        {

            key: "resident",

            title: "Resident",

            render: (row) => (

                row.resident?.full_name

            )

        },

        {

            key: "period_month",

            title: "Period",
            render: (row) => (

                row.period_month + '/' + row.period_year

            )

        },

        {

            key: "amount",

            title: "Amount",

            render: (row) => (

                formatCurrency(

                    row.amount

                )

            )

        },

        {

            key: "status",

            title: "Status",

            render: (row) => (

                <BillingStatusBadge

                    status={row.status}

                />

            )

        },


    ];

    return (

        <Table

            columns={columns}

            data={data}

            loading={loading}

        />

    );

}