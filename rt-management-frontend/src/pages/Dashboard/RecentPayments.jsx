import Card from "@/components/common/Card";
import DataTable from "@/components/common/DataTable/DataTable";

import { formatCurrency } from "@/utils/currency";
import { formatDate } from "@/utils/date";

export default function RecentPayments({

    data = []

}) {

    const columns = [

        {

            key: "resident_name",

            title: "Resident"

        },

        {

            key: "receipt_number",

            title: "Receipt"

        },

        {

            key: "amount",

            title: "Amount",

            render: row =>

                formatCurrency(row.amount)

        },

        {

            key: "payment_date",

            title: "Payment Date",

            render: row =>

                formatDate(row.payment_date)

        }

    ];

    return (

        <Card className="mt-8">

            <div className="mb-5">

                <h2 className="text-xl font-semibold">

                    Recent Payments

                </h2>

                <p className="text-sm text-gray-500">

                    Latest resident payments

                </p>

            </div>

            <DataTable

                columns={columns}

                data={data}

                emptyMessage="No payment data."

            />

        </Card>

    );

}