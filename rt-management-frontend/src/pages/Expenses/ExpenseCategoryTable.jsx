import {

    DataTable

} from "@/components/common";

export default function ExpenseCategoryTable({

    data,

    loading

}) {

    const columns = [

        {

            key: "name",

            title: "Category"

        },

        {

            key: "description",

            title: "Description",

            render: row =>

                row.description ||

                "-"

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