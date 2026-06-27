import {

    useEffect

} from "react";

import MainLayout from "@/layouts/MainLayout";

import {

    Card,

    PageHeader

} from "@/components/common";

import useReports from "@/hooks/useReports";

import ReportFilter from "./ReportFilter";

import SummaryCard from "./SummaryCard";

import IncomeTable from "./IncomeTable";

import ExpenseTable from "./ExpenseTable";

export default function ReportPage() {

    const {

        loading,

        summary,

        incomes,

        expenses,

        filter,

        setFilter,

        fetchMonthlyReport

    } = useReports();

    useEffect(() => {

        fetchMonthlyReport(filter);

    }, []);

    const handleGenerate = () => {

        fetchMonthlyReport(filter);

    };

    return (

        <MainLayout>

            <PageHeader

                title="Monthly Financial Report"

                subtitle="Income & Expense Report"

            />

            <Card className="mb-6">

                <ReportFilter

                    filter={filter}

                    onChange={setFilter}

                    onGenerate={handleGenerate}

                    loading={loading}

                />

            </Card>

            <SummaryCard

                summary={summary}

            />

            <Card className="mb-6">

                <IncomeTable

                    data={incomes}

                    loading={loading}

                />

            </Card>

            <Card>

                <ExpenseTable

                    data={expenses}

                    loading={loading}

                />

            </Card>

        </MainLayout>

    );

}