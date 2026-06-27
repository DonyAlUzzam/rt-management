import {

    DataTable

} from "@/components/common";

import {

    formatCurrency

} from "@/utils/currency";

export default function ExpenseTable({

    data = [],

    loading

}) {

    const columns = [

        {

            key: "expense_date",

            title: "Expense Date",

            render: row =>

                new Date(

                    row.expense_date

                ).toLocaleDateString()

        },

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

            align: "right",

            render: row =>

                formatCurrency(

                    row.amount

                )

        }

    ];

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

                    Expenses Information

                </h2>

            </div>

            <div>
                <DataTable

                    title="Expenses"

                    columns={columns}

                    data={data}

                    loading={loading}

                />
            </div>
        </div>


    );

}