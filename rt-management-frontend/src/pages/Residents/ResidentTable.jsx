import {

    Badge,
    Button,
    DataTable,

} from "@/components/common";

import {

    FaEdit,

    FaTrash

} from "react-icons/fa";

export default function ResidentTable({

    data = [],

    loading = false,

    onEdit,

    onDelete

}) {

    const columns = [

        {

            key: "full_name",

            title: "Name"

        },

        {

            key: "phone",

            title: "Phone"

        },

        {

            key: "marital_status",

            title: "Status Pernikahan"

        },

        {

            key: "resident_type",

            title: "Status Penghuni"

        },

        {
            key: "ktp_photo",

            title: "KTP Photo",

            render: (row) => (

                row.ktp_photo ? (

                    <a

                        href={`${import.meta.env.VITE_API_STORAGE}/${row.ktp_photo}`}

                        target="_blank"

                        rel="noopener noreferrer"

                    >

                        <img

                            src={`${import.meta.env.VITE_API_STORAGE}/${row.ktp_photo}`}

                            alt={row.full_name}

                            className="

                                w-14

                                h-14

                                rounded-lg

                                object-cover

                                border

                                hover:scale-110

                                transition

                            "

                        />

                    </a>

                ) : (

                    <span className="text-gray-400">

                        No Photo

                    </span>

                )

            )

        },

        {

            key: "action",

            title: "Action",

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
                    
                        size="sm"

                        variant="danger"

                        onClick={() =>

                            onDelete(row)

                        }

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

            emptyMessage="No resident found."

        />

    );

}