import {

    DataTable as Table,
    Button

} from "@/components/common";

import {

    formatCurrency

} from "@/utils/currency";
import { formatDate } from "@/utils/date";

import PaymentStatusBadge from "./PaymentStatusBadge";

export default function PaymentHistory({

    data,

    loading,
    onDetail

}){

    const columns=[

        {

            key:"payment_date",

            title:"Date",
            render: (row) => formatDate(row.payment_date),

        },

        {

            key:"resident",

            title:"Resident",

            render:(row)=>

                row.resident?.full_name

        },

        {

            key:"amount",

            title:"Amount",

            render:(row)=>

                formatCurrency(

                    row.total_amount

                )

        },

        {

            key:"status",

            title:"Status",

            render:(row)=>

                <PaymentStatusBadge

                    status="success"

                />

        },
        {

            key: "action",

            title: "Action",

            align: "center",

            render: row => (

                <Button

                    size="sm"

                    variant="secondary"

                    onClick={() =>

                        onDetail(row)

                    }

                >

                    Detail

                </Button>

            )

        }

    ];

    return(

        <Table

            columns={columns}

            data={data}

            loading={loading}

        />

    );

}