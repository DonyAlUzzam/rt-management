import Loading from "../Loading";
import EmptyState from "../EmptyState";

export default function DataTable({

    columns = [],

    data = [],

    loading = false,

    emptyMessage = "No data found"

}) {

    if (loading) {

        return <Loading />;

    }

    if (data.length === 0) {

        return (

            <EmptyState

                message={emptyMessage}

            />

        );

    }

    return (

        <div className="overflow-x-auto rounded-xl bg-white shadow">

            <table className="min-w-full">

                <thead className="bg-gray-100">

                    <tr>

                        {

                            columns.map(column => (

                                <th

                                    key={column.key}

                                    className="
                                        px-6
                                        py-3
                                        text-left
                                        text-sm
                                        font-semibold
                                    "

                                >

                                    {column.title}

                                </th>

                            ))

                        }

                    </tr>

                </thead>

                <tbody>

                    {

                        data.map((row, index) => (

                            <tr

                                key={index}

                                className="
                                    border-t
                                    hover:bg-gray-50
                                "

                            >

                                {

                                    columns.map(column => (

                                        <td

                                            key={column.key}

                                            className="px-6 py-4"

                                        >

                                            {

                                                column.render

                                                    ?

                                                    column.render(row)

                                                    :

                                                    row[column.key]

                                            }

                                        </td>

                                    ))

                                }

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}