import Loading from "../Loading";
import EmptyState from "../EmptyState";

import {

    Fragment,
    useState

} from "react";

import {

    ChevronRight,

    ChevronDown

} from "lucide-react";
export default function ExpendTable({

    columns = [],

    data = [],

    loading = false,

    renderExpanded,

    emptyMessage = "No data found"

}) {

    const [

        expandedRows,

        setExpandedRows

    ] = useState([]);

    const toggleRow = (key) => {

        setExpandedRows((prev) =>

            prev.includes(key)

                ? prev.filter(

                    item => item !== key

                )

                : [

                    ...prev,

                    key

                ]

        );

    };

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

                            renderExpanded && (

                                <th

                                    className="

                                        w-12

                                        px-3

                                        py-3

                                    "

                                />

                            )

                        }

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

                        data.map((row, index) => {

                            const rowKey =

                                row.id ??

                                index;

                            const expanded =

                                expandedRows.includes(

                                    rowKey

                                );

                            return (

                                <Fragment

                                    key={rowKey}

                                >

                                    <tr

                                        className="

                                            border-t

                                            hover:bg-gray-50

                                        "

                                    >

                                        {

                                            renderExpanded && (

                                                <td

                                                    className="

                                                        px-3

                                                        text-center

                                                    "

                                                >

                                                    <button

                                                        type="button"

                                                        onClick={()=>

                                                            toggleRow(

                                                                rowKey

                                                            )

                                                        }

                                                    >

                                                        {

                                                            expanded

                                                                ?

                                                                <ChevronDown

                                                                    size={18}

                                                                />

                                                                :

                                                                <ChevronRight

                                                                    size={18}

                                                                />

                                                        }

                                                    </button>

                                                </td>

                                            )

                                        }

                                        {

                                            columns.map(column => (

                                                <td

                                                    key={column.key}

                                                    className="

                                                        px-6

                                                        py-4

                                                    "

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

                                    {

                                        expanded &&

                                        renderExpanded && (

                                            <tr>

                                                <td

                                                    colSpan={

                                                        columns.length +

                                                        1

                                                    }

                                                    className="

                                                        bg-gray-50

                                                        px-6

                                                        py-4

                                                    "

                                                >

                                                    {

                                                        renderExpanded(

                                                            row

                                                        )

                                                    }

                                                </td>

                                            </tr>

                                        )

                                    }

                                </Fragment>

                            );

                        })

                    }

                </tbody>

            </table>

        </div>

    );

}