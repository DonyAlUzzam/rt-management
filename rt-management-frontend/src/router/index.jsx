import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Auth/Login";

import Dashboard from "../pages/Dashboard/Dashboard";

import ResidentPage from "../pages/Residents";
import HousePage from "@/pages/House/HousePage";
import HouseDetailPage from "@/pages/House/Detail/HouseDetailPage";
import BillingPage from "@/pages/Billing/BillingPage";
import PaymentPage from "@/pages/Payments/PaymentPage";
import ExpensePage from "@/pages/Expenses/ExpensePage";
import ReportPage from "@/pages/Reports/ReportPage";

export default function Router() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Dashboard />} />

                {/* <Route

                    path="/dashboard"

                    element={

                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>

                    }

                /> */}

                <Route

                    path="/dashboard"

                    element={<Dashboard />}

                />

                <Route

                    path="/residents"

                    element={<ResidentPage />}

                />

                <Route

                    path="/houses"

                    element={<HousePage />}

                />

                <Route path="/houses/:id" element={<HouseDetailPage />} />

                <Route

                    path="/billings"

                    element={<BillingPage />}

                />

                <Route

                    path="/payments"

                    element={<PaymentPage />}

                />

                <Route

                    path="/expenses"

                    element={<ExpensePage />}

                />

                <Route

                    path="/reports"

                    element={<ReportPage />}

                />

            </Routes>

        </BrowserRouter>

    );

}




