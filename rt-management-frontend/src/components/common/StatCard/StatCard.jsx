export default function StatCard({

    title,

    value,

    icon

}) {

    return (

        <div
            className="
                rounded-xl
                bg-white
                shadow-sm
                border
                border-gray-100
                p-6
                transition
                hover:shadow-lg
            "
        >

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-gray-500 text-sm">

                        {title}

                    </p>

                    <h2 className="text-3xl font-bold mt-2">

                        {value}

                    </h2>

                </div>

                <div
                    className="
                        rounded-full
                        bg-blue-100
                        p-3
                        text-blue-600
                    "
                >

                    {icon}

                </div>

            </div>

        </div>

    );

}