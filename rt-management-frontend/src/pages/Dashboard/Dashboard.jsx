import MainLayout from "@/layouts/MainLayout";

import {
    Loading,
    PageHeader
} from "@/components/common";

import useDashboard from "@/hooks/useDashboard";

import DashboardStats from "./DashboardStats";
import IncomeExpenseChart from "./IncomeExpenseChart";
import RecentPayments from "./RecentPayments";
import RecentExpenses from "./RecentExpenses";

export default function Dashboard() {

    const {

        loading,

        statistics,

        monthlyChart,

        recentPayments,

        recentExpenses

    } = useDashboard();

    if (loading) {

        return <Loading />;

    }

    return (

        <MainLayout>

            <PageHeader

                title="Dashboard"

                subtitle="RT Management Overview"

            />

            <DashboardStats

                statistics={statistics}

            />

            <IncomeExpenseChart

                data={monthlyChart}

            />

            <RecentPayments

                data={recentPayments}

            />

            <RecentExpenses

                data={recentExpenses}

            />

        </MainLayout>

    );

}