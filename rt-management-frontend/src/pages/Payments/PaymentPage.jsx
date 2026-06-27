import { useState } from "react";

import MainLayout from "@/layouts/MainLayout";

import {

    Card,

    Button,

    CrudToolbar,

    PageHeader,

    Pagination

} from "@/components/common";

import usePayments from "@/hooks/usePayments";

import PaymentTable from "./PaymentTable";

import PaymentHistory from "./PaymentHistory";

import PaymentForm from "./PaymentForm";

import PaymentDetailModal from "./PaymentDetailModal";

export default function PaymentPage() {

    const {

        loading,

        saving,

        payments,

        history,

        meta,

        historyMeta,

        search,

        setSearch,

        fetchPayments,

        fetchHistory,

        createPayment,
        fetchPaymentDetail

    } = usePayments();

    const [

        activeTab,

        setActiveTab

    ] = useState("pending");

    const [

        openModal,

        setOpenModal

    ] = useState(false);

    const [

        openDetail,

        setOpenDetail

    ] = useState(false);

    const [

        paymentDetail,

        setPaymentDetail

    ] = useState(null);

    const [

        selectedBills,

        setSelectedBills

    ] = useState([]);

    const [paymentBills, setPaymentBills] = useState([]);

    const handleSelectionChange = (

        bills

    ) => {

        setSelectedBills(

            bills

        );

    };

    const handleDetail = async (payment) => {

        const detail =
            await fetchPaymentDetail(payment.id);

        setPaymentDetail(detail);

        setOpenDetail(true);

    };

    const handlePaySelected = () => {

        if (!selectedBills.length) return;

        setPaymentBills(selectedBills);

        setOpenModal(true);

    };

    const handlePay = (

        billing

    ) => {

        setPaymentBills([billing]);

        setOpenModal(true);

    };

    const handleClose = () => {

        setOpenModal(false);

        setSelectedBills([]);

    };

    const handleCloseDetail = () => {

        setOpenDetail(false);

       setPaymentDetail(null);

    };

    const handleSubmit = async (payload) => {

        const result = await createPayment(payload);

        if (result.success) {

            handleClose();

            fetchPayments();

            fetchHistory();
        }

    };

    return (

        <MainLayout>

            <PageHeader

                title="Payment"

                subtitle="Manage resident payments"

            />

            <Card>

                <div

                    className="

                        flex

                        gap-2

                        mb-5

                    "

                >

                    <button

                        className={`

                            px-4

                            py-2

                            rounded-lg

                            transition

                            ${

                                activeTab === "pending"

                                ?

                                "bg-blue-600 text-white"

                                :

                                "bg-gray-100"

                            }

                        `}

                        onClick={()=>

                            setActiveTab(

                                "pending"

                            )

                        }

                    >

                        Pending Payment

                    </button>

                    <button

                        className={`

                            px-4

                            py-2

                            rounded-lg

                            transition

                            ${

                                activeTab === "history"

                                ?

                                "bg-blue-600 text-white"

                                :

                                "bg-gray-100"

                            }

                        `}

                        onClick={()=>

                            setActiveTab(

                                "history"

                            )

                        }

                    >

                        Payment History

                    </button>

                </div>

                <CrudToolbar

                    search={search}

                    onSearch={setSearch}

                    showAdd={false}

                />

                {

                    activeTab ===

                    "pending"

                    ?

                    <>

                        <div className="flex justify-between items-center mb-4">

                            <div>

                                {

                                    selectedBills.length >

                                    0 && (

                                        <span>

                                            {

                                                selectedBills.length

                                            }

                                            {" "}bill selected

                                        </span>

                                    )

                                }

                            </div>

                            {

                                selectedBills.length >

                                0 && (

                                    <Button

                                        onClick={

                                            handlePaySelected

                                        }

                                    >

                                        Pay Selected

                                    </Button>

                                )

                            }

                        </div>

                        <PaymentTable

                            data={payments}

                            loading={loading}

                            onPay={handlePay}

                            selectedBills={

                                selectedBills

                            }

                            onSelectionChange={

                                handleSelectionChange

                            }

                        />

                        <Pagination

                            meta={meta}

                            onChange={

                                fetchPayments

                            }

                        />

                    </>

                    :

                    <>

                        <PaymentHistory

                            data={history}

                            loading={loading}
                            onDetail={handleDetail}

                        />

                        <PaymentDetailModal

                            open={openDetail}

                            payment={paymentDetail}

                            onClose={handleCloseDetail}

                        />

                        <Pagination

                            meta={historyMeta}

                            onChange={

                                fetchHistory

                            }

                        />

                    </>

                }

            </Card>

            <PaymentForm

                open={openModal}

                billings={paymentBills}

                loading={saving}

                onSubmit={handleSubmit}

                onClose={handleClose}

            />

        </MainLayout>

    );

}