import {
    Button,
    Badge,
    DataTable,
} from "@/components/common";

import {

    FaEdit,

    FaTrash,

    FaInfo

} from "react-icons/fa";

export default function HouseTable({

    data = [],

    loading,

    onEdit,

    onDelete,

    onDetail

}) {

    const columns = [

        {

            key: "house_number",

            title: "House Number"

        },

        {

            key: "address",

            title: "Address"

        },

        {

            key: "status",

            title: "Status",

            render: (row) => (

                <Badge

                    variant={

                        row.status === "occupied"

                            ? "success"

                            : "secondary"

                    }

                >

                    {

                        row.status === "occupied"

                            ? "Occupied"

                            : "Vacant"

                    }

                </Badge>

            )

        },

        {

            key: "action",

            title: "Action",

            align: "right",

            render: (row) => (

                <div className="flex gap-2">

                    <Button

                        variant="warning"

                        size="sm"

                        onClick={() => onEdit(row)}

                    >

                        <FaEdit />

                    </Button>

                    <Button

                        variant="secondary"

                        size="sm"

                        onClick={() => onDetail(row)}

                    >

                        <FaInfo />

                    </Button>

                    <Button

                        variant="danger"

                        size="sm"

                        onClick={() => onDelete(row)}

                    >

                        <FaTrash />

                    </Button>

                </div>

            )

        }

    ];

    return (

        <DataTable

            columns={columns}

            data={data}

            loading={loading}

            emptyMessage="No house data found."

        />

    );

}