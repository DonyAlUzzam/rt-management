export default function InfoItem({

    icon,

    label,

    value

}) {

    return (

        <div>

            <label

                className="

                    text-sm

                    text-gray-500

                "

            >

                {label}

            </label>

            <div

                className="

                    mt-2

                    flex

                    items-center

                    gap-3

                    font-medium

                    text-gray-700

                "

            >

                <span

                    className="

                        text-blue-600

                    "

                >

                    {icon}

                </span>

                <span>

                    {value}

                </span>

            </div>

        </div>

    );

}