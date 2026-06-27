import {

    DataTable as Table,
    Badge,
    EmptyState

} from "@/components/common";

import { formatCurrency } from "@/utils/currency";

export default function PaymentHistory({

    data = [],

    loading = false

}) {

    const columns = [

        {

            key: "period_month",

            title: "Period",
            render: (row) => (

                row.period_month + '/' + row.period_year

            )

        },

        {

            key: "resident",

            title: "Resident",

            render: (row) => (

                row.resident?.full_name ?? "-"

            )

        },

        {

            key: "amount",

            title: "Amount",

            render: (row) => (

                formatCurrency(row.amount)

            )

        },

        {

            key: "status",

            title: "Status",

            render: (row) => (

                <Badge

                    variant={

                        row.status === "paid"

                            ? "success"

                            : "warning"

                    }

                >

                    {

                        row.status === "paid"

                            ? "Paid"

                            : "Unpaid"

                    }

                </Badge>

            )

        },

        {
            key: "updated_at",
            title: "Paid At",
            render: (row) => {
                if (row.status === "unpaid") {
                    return "-";
                }

                return row.updated_at
                    ? formatDate(row.updated_at)
                    : "-";
            }
        }

    ];

    if (!loading && (!data || data.length === 0)) {

        return (

            <EmptyState

                title="No Payment History"

                description="There is no payment history for this house."

            />

        );

    }

    return (
        <div className="space-y-6">

            <div>

                <h2

                    className="

                        text-lg

                        font-semibold

                        text-gray-800

                    "

                >

                    Payment History

                </h2>

            </div>
            <div>
                <Table

                    columns={columns}

                    data={data}

                    loading={loading}

                />
            </div>
        </div>

    );

}

function formatDate(date) {

    if (!date) return "-";

    return new Date(date).toLocaleDateString(

        "id-ID"

    );

}