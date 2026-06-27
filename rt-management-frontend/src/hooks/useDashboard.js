import { useEffect, useState } from "react";
import { getDashboard } from "@/services/dashboardService";

export default function useDashboard() {

    const [loading, setLoading] = useState(true);

    const [statistics, setStatistics] = useState({});

    const [monthlyChart, setMonthlyChart] = useState([]);

    const [recentPayments, setRecentPayments] = useState([]);

    const [recentExpenses, setRecentExpenses] = useState([]);

    const loadDashboard = async () => {

        try {

            setLoading(true);

            const response = await getDashboard();

            const data = response.data;

            setStatistics(data.statistics ?? {});

            setMonthlyChart(data.monthly_chart ?? []);

            setRecentPayments(data.recent_payments ?? []);

            setRecentExpenses(data.recent_expenses ?? []);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadDashboard();

    }, []);

    return {

        loading,

        statistics,

        monthlyChart,

        recentPayments,

        recentExpenses,

        reload: loadDashboard

    };

}