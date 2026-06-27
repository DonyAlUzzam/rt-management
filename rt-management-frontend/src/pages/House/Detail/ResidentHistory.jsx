import {

    DataTable as Table,
    Badge,
    EmptyState,
    Button

} from "@/components/common";

export default function ResidentHistory({

    data = [],

    loading = false,

    onCheckout = () => {},

}) {

    const columns = [

        {

            key: "resident",

            title: "Resident",

            render: (row) => (

                row.resident?.full_name ?? "-"

            )

        },

        {

            key: "start_date",

            title: "Move In",

            render: (row) => (

                formatDate(

                    row.start_date

                )

            )

        },

        {

            key: "end_date",

            title: "Move Out",

            render: (row) => (

                row.end_date

                    ? formatDate(

                        row.end_date

                    )

                    : "-"

            )

        },

        {

            key: "duration",

            title: "Duration",

            render: (row) => (

                row.duration ??

                "-"

            )

        },

        {

            key: "is_active",

            title: "Status",

            render: (row) => (

                <Badge

                    variant={

                        row.is_active === true

                            ? "success"

                            : "secondary"

                    }

                >

                    {

                        row.is_active === true

                            ? "Active"

                            : "Checked Out"

                    }

                </Badge>

            )

        },
        {
            key: "action",
            title: "Action",
            align: "center",
            render: (row) => (
                <div className="flex gap-2">
                    {row.is_active && (
                        <Button
                            variant="warning"
                            size="sm"
                            onClick={() => onCheckout(row)}
                        >
                            Checkout
                        </Button>
                    )}
                </div>
            )
        }

    ];

    if (!loading && data.length === 0) {

        return (

            <EmptyState

                title="No Resident History"

                description="There is no resident history for this house."

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

                    Resident History

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