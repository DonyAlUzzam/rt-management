import { FaInbox } from "react-icons/fa";

export default function EmptyState({

    message = "Data not found"

}) {

    return (

        <div

            className="
                rounded-xl
                bg-white
                py-20
                text-center
                shadow
            "

        >

            <FaInbox

                size={50}

                className="mx-auto text-gray-400"

            />

            <p

                className="
                    mt-4
                    text-gray-500
                "

            >

                {message}

            </p>

        </div>

    );

}