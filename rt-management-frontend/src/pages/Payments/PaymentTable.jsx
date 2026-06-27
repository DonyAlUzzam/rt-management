import {

    DataTable,

    Button

} from "@/components/common";

import {

    FaMoneyBillWave

} from "react-icons/fa";

import {

    formatCurrency

} from "@/utils/currency";

export default function PaymentTable({

    data,

    loading,

    onPay,

    selectedBills,

    onSelectionChange

}) {

    const columns = [

        {

            key: "select",

            title: "",

            render: (

                row

            ) => (

                <input

                    type="checkbox"

                    checked={

                        isSelected(

                            row

                        )

                    }

                    disabled={

                        isDisabled(

                            row

                        )

                    }

                    onChange={() =>

                        toggleSelection(

                            row

                        )

                    }

                />

            )

        },
        {

            key: "house",

            title: "House",

            render: row =>

                row.house?.house_number

        },

        {

            key: "resident",

            title: "Resident",

            render: row =>

                row.resident?.full_name

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

                        onPay(row)

                    }

                >

                    <FaMoneyBillWave />

                    <span>

                        Pay

                    </span>

                </Button>

            )

        }

    ];

    const isSelected = ( billing ) => selectedBills.some(
        item => item.id === billing.id
    );

    const firstResidentId = selectedBills[0]?.resident?.id;

    const toggleSelection = (

        billing

    ) => {

        if (

            isSelected(

                billing

            )

        ) {

            onSelectionChange(

                selectedBills.filter(

                    item =>

                        item.id !==

                        billing.id

                )

            );

            return;

        }

        onSelectionChange([

            ...selectedBills,

            billing

        ]);

    };

    const isDisabled = (

        billing

    ) =>

        selectedBills.length >

            0 &&

        billing.resident.id !==

            firstResidentId;

    return (

        <DataTable

            columns={columns}

            data={data}

            loading={loading}

        />

    );

}