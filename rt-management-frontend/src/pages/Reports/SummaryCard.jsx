import {

    Card

} from "@/components/common";

import {

    formatCurrency

} from "@/utils/currency";

export default function SummaryCard({

    summary

}) {

    return (

        <div

            className="

                mb-6

                grid

                gap-4

                md:grid-cols-3

            "

        >

            <Card>

                <p

                    className="

                        text-sm

                        text-gray-500

                    "

                >

                    Total Income

                </p>

                <h2

                    className="

                        mt-2

                        text-2xl

                        font-bold

                        text-green-600

                    "

                >

                    {

                        formatCurrency(

                            summary.total_income

                        )

                    }

                </h2>

            </Card>

            <Card>

                <p

                    className="

                        text-sm

                        text-gray-500

                    "

                >

                    Total Expense

                </p>

                <h2

                    className="

                        mt-2

                        text-2xl

                        font-bold

                        text-red-600

                    "

                >

                    {

                        formatCurrency(

                            summary.total_expense

                        )

                    }

                </h2>

            </Card>

            <Card>

                <p

                    className="

                        text-sm

                        text-gray-500

                    "

                >

                    Balance

                </p>

                <h2

                    className={`

                        mt-2

                        text-2xl

                        font-bold

                        ${

                            summary.balance >= 0

                                ? "text-blue-600"

                                : "text-red-600"

                        }

                    `}

                >

                    {

                        formatCurrency(

                            summary.balance

                        )

                    }

                </h2>

            </Card>

        </div>

    );

}