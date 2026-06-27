import {

    ExpendTable

} from "@/components/common";

import {

    formatCurrency

} from "@/utils/currency";

export default function IncomeTable({

    data = [],

    loading

}) {

    const columns = [

        {

            key: "payment_date",

            title: "Payment Date",

            render: row =>

                new Date(

                    row.payment_date

                ).toLocaleDateString()

        },

        {

            key: "resident_name",

            title: "Resident"

        },

        {

            key: "house_number",

            title: "House"

        },

        {

            key: "bill_count",

            title: "Bills"

        },

        {

            key: "notes",

            title: "Notes"

        },

        {

            key: "total_amount",

            title: "Amount",

            align: "right",

            render: row =>

                formatCurrency(

                    row.total_amount

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

                    Income Information

                </h2>

            </div>
            <div>
                <ExpendTable

                    columns={columns}

                    data={data}

                    loading={loading}

                    renderExpanded={(row)=>(

                        <table

                            className="

                                w-full

                                text-sm

                            "

                        >

                            <thead>

                                <tr>

                                    <th align="left">

                                        Bill Type

                                    </th>

                                    <th align="left">

                                        Period

                                    </th>

                                    <th align="left">

                                        Amount

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    row.bills.map(

                                        bill=>(

                                            <tr

                                                key={

                                                    bill.period+

                                                    bill.bill_type

                                                }

                                            >

                                                <td>

                                                    {

                                                        bill.bill_type

                                                    }

                                                </td>

                                                <td>

                                                    {

                                                        bill.period

                                                    }

                                                </td>

                                                <td>

                                                    Rp {

                                                        Number(

                                                            bill.amount

                                                        )

                                                            .toLocaleString()

                                                    }

                                                </td>

                                            </tr>

                                        )

                                    )

                                }

                            </tbody>

                        </table>

                    )}

                />
            </div>
        </div>
        
    );

}