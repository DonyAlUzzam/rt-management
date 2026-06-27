import Card from "@/components/common/Card";
import DataTable from "@/components/common/DataTable/DataTable";

import { formatCurrency } from "@/utils/currency";
import { formatDate } from "@/utils/date";

export default function RecentExpenses({

    data = []

}) {

    const columns = [

        {

            key: "category",

            title: "Category"

        },

        {

            key: "description",

            title: "Description"

        },

        {

            key: "amount",

            title: "Amount",

            render: (row) =>

                formatCurrency(row.amount)

        },

        {

            key: "expense_date",

            title: "Expense Date",

            render: (row) =>

                formatDate(row.expense_date)

        }

    ];

    return (

        <Card className="mt-8">

            <div className="mb-5">

                <h2 className="text-xl font-semibold">

                    Recent Expenses

                </h2>

                <p className="text-sm text-gray-500">

                    Latest operational expenses

                </p>

            </div>

            <DataTable

                columns={columns}

                data={data}

                emptyMessage="No expense data."

            />

        </Card>

    );

}