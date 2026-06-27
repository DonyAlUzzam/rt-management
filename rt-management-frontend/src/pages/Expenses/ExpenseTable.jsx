import {

    DataTable,

    Button

} from "@/components/common";

import { formatCurrency } from "@/utils/currency";
import { FaEdit } from "react-icons/fa";

export default function ExpenseTable({

    data,

    loading,

    onEdit,

}) {

    const columns = [

        {

            key: "expense_date",

            title: "Date",

            render: row =>

                new Date(

                    row.expense_date

                ).toLocaleDateString()

        },

        {

            key: "category",

            title: "Category",

            render: row =>

                row.category?.name

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

        },

        {

            key: "action",

            title: "Action",

            align: "center",

            render: row => (

                <Button
                
                    size="sm"

                    onClick={() =>

                        onEdit(row)

                    }

                >

                    <FaEdit />

                    <span>

                        Edit

                    </span>

                </Button>

            )

        }

    ];

    return (

        <DataTable

            columns={columns}

            data={data}

            loading={loading}

        />

    );

}