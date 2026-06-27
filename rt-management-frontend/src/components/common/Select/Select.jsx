import clsx from "clsx";

export default function Select({

    label,

    options = [],

    optionLabel = "label",

    optionValue = "value",

    placeholder = "Select option",

    error,

    className,

    ...props

}) {

    return (

        <div className="space-y-2">

            {

                label && (

                    <label

                        className="

                            block

                            text-sm

                            font-medium

                            text-gray-700

                        "

                    >

                        {label}

                    </label>

                )

            }

            <select

                className={clsx(

                    "w-full rounded-lg border px-3 py-2",

                    "focus:outline-none",

                    "focus:ring-2",

                    "focus:ring-blue-500",

                    error

                        ? "border-red-500"

                        : "border-gray-300",

                    className

                )}

                {...props}

            >

                <option value="">

                    {placeholder}

                </option>

                {

                    options.map((item) => (

                        <option

                            key={

                                item[optionValue]

                            }

                            value={

                                item[optionValue]

                            }

                            disabled={

                                item.disabled

                            }

                        >

                            {

                                item[optionLabel]

                            }

                        </option>

                    ))

                }

            </select>

            {

                error && (

                    <p

                        className="

                            text-sm

                            text-red-500

                        "

                    >

                        {error}

                    </p>

                )

            }

        </div>

    );

}