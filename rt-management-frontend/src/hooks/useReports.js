import {

    useState

} from "react";

import reportService from "@/services/reportService";

export default function useReports() {

    const [

        loading,

        setLoading

    ] = useState(false);

    const [

        report,

        setReport

    ] = useState(null);

    const [

        summary,

        setSummary

    ] = useState({

        total_income: 0,

        total_expense: 0,

        balance: 0

    });

    const [

        incomes,

        setIncomes

    ] = useState([]);

    const [

        expenses,

        setExpenses

    ] = useState([]);

    const [

        filter,

        setFilter

    ] = useState({

        month:

            new Date()

                .getMonth() + 1,

        year:

            new Date()

                .getFullYear()

    });

    const fetchMonthlyReport = async (

        params = filter

    ) => {

        try {

            setLoading(true);

            const response =

                await reportService.monthly(

                    params

                );

            const data =

                response.data;

            setReport(data);

            setSummary(

                data.summary

            );

            setIncomes(

                data.income

            );

            setExpenses(

                data.expenses

            );

            setFilter({

                month:

                    Number(data.month),

                year:

                    Number(data.year)

            });

            return data;

        }

        catch (error) {

            console.error(error);

            return null;

        }

        finally {

            setLoading(false);

        }

    };

    return {

        loading,

        report,

        summary,

        incomes,

        expenses,

        filter,

        setFilter,

        fetchMonthlyReport

    };

}