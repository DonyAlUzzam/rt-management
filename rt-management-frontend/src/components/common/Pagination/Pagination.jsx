export default function Pagination({

    meta,

    onChange

}) {

    if (!meta.last_page) {

        return null;

    }

    return (

        <div

            className="

                flex

                justify-between

                items-center

                mt-6

            "

        >

            <span>

                Showing

                {" "}

                {meta.from ?? 0}

                -

                {meta.to ?? 0}

                {" "}

                of

                {" "}

                {meta.total ?? 0}

            </span>

            <div className="flex gap-2">

                <button

                    disabled={!meta.current_page || meta.current_page === 1}

                    onClick={() =>

                        onChange(meta.current_page - 1)

                    }

                    className="border rounded px-4 py-2"

                >

                    Previous

                </button>

                <span

                    className="px-4 py-2"

                >

                    {meta.current_page}

                    /

                    {meta.last_page}

                </span>

                <button

                    disabled={
                        !meta.current_page ||
                        meta.current_page === meta.last_page
                    }

                    onClick={() =>

                        onChange(meta.current_page + 1)

                    }

                    className="border rounded px-4 py-2"

                >

                    Next

                </button>

            </div>

        </div>

    );

}