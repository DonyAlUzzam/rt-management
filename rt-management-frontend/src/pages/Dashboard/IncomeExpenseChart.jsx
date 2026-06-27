import Chart from "react-apexcharts";
import Card from "@/components/common/Card";

export default function IncomeExpenseChart({

    data = []

}) {

    const categories = data.map(item => item.month);

    const income = data.map(item => item.income);

    const expense = data.map(item => item.expense);

    const options = {

        chart: {

            toolbar: {

                show: false

            },

            zoom: {

                enabled: false

            }

        },

        stroke: {

            curve: "smooth",

            width: 3

        },

        dataLabels: {

            enabled: false

        },

        xaxis: {

            categories

        },

        yaxis: {

            labels: {

                formatter: value =>

                    new Intl.NumberFormat("id-ID").format(value)

            }

        },

        tooltip: {

            y: {

                formatter: value =>

                    "Rp " +

                    new Intl.NumberFormat("id-ID").format(value)

            }

        },

        legend: {

            position: "top"

        }

    };

    const series = [

        {

            name: "Income",

            data: income

        },

        {

            name: "Expense",

            data: expense

        }

    ];

    if (!data.length) {

        return (

            <Card className="mt-8">

                <div className="py-20 text-center">

                    <h2 className="text-lg font-semibold">

                        Income vs Expense

                    </h2>

                    <p className="mt-3 text-gray-500">

                        No financial data available.

                    </p>

                </div>

            </Card>

        );

    }

    return (

        <Card className="mt-8">

            <div className="mb-5">

                <h2 className="text-xl font-semibold">

                    Income vs Expense

                </h2>

                <p className="text-gray-500 text-sm">

                    Monthly financial summary

                </p>

            </div>

            <Chart

                options={options}

                series={series}

                type="line"

                height={350}

            />

        </Card>

    );

}