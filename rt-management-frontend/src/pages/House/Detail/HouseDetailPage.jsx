import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import {

    useParams

} from "react-router-dom";

import {

    Button,

    Card,

    PageHeader,

    Loading,

    confirmCheckout

} from "@/components/common";

import {

    FaArrowLeft,

    FaUserPlus

} from "react-icons/fa";

import useOccupancy from "@/hooks/useOccupancy";
import useHouses from "@/hooks/useHouses";
// import usePayments from "@/hooks/usePayments";

import HouseInformation from "./HouseInformation";

import ResidentHistory from "./ResidentHistory";

import PaymentHistory from "./PaymentHistory";

import AssignResidentModal from "./AssignResidentModal";

export default function HouseDetailPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [openAssign, setOpenAssign] = useState(false);

    const {

        house,

        getHouse,

        historyPayment,

        getPaymentHistory,

    } = useHouses();

    const {

        loading,

        availableResidents,

        getAvailableResidents,

        assignResident,
        residentHistory,

        getResidentHistory,

        saving,
        checkoutResident

    } = useOccupancy();

    const handleAssignResident = async (payload) => {

        const assign = await assignResident(payload);

        if (assign.success) {

            setOpenAssign(false);

            await getHouse(house.id);

            await getResidentHistory(house.id);

        }

    };

    const handleCheckoutResident = async (data) => {

        confirmCheckout(async () => {
            const payload = {
                resident_id: data.resident_id,
                house_id: data.house_id
            };

            const result = await checkoutResident(payload);

            if (result.success) {

                console.log("Resident Checkout");
                await getHouse(house.id);

                await getResidentHistory(house.id);

            }

        });

    };

    useEffect(() => {

        getHouse(id);

    }, [id]);

    useEffect(() => {

        if (house?.id) {

            getPaymentHistory(

                house.id

            );

        }

    }, [

        house?.id

    ]);

    
    useEffect(() => {

        if (house?.id) {

            getResidentHistory(house.id);

        }

    }, [house?.id]);

    useEffect(() => {

        if (openAssign) {

            getAvailableResidents();

        }

    }, [openAssign]);

    if (loading  || !house ) {

        return <Loading />;

    }
    return (

        <MainLayout>

            <div className="mb-6">

                <Button

                    variant="secondary"

                    onClick={() =>

                        navigate(-1)

                    }

                >

                    <FaArrowLeft />

                    <span>

                        Back

                    </span>

                </Button>

            </div>

            <PageHeader

                title={`House ${house.house_number}`}

                subtitle={`Address : ${house.address || "-"}`}

            />

            <div

                className="

                    flex

                    justify-end

                    mb-6

                "

            >

                <Button

                    onClick={() =>

                        setOpenAssign(true)

                    }

                >

                    <FaUserPlus />

                    <span>

                        Assign Resident

                    </span>

                </Button>

            </div>

            <div

                className="

                    grid

                    gap-6

                "

            >

                <Card>

                    <HouseInformation

                        house={house}

                    />

                </Card>

                <Card>

                    <ResidentHistory

                        data={residentHistory}

                        loading={loading}
                        onCheckout={handleCheckoutResident}

                    />


                </Card>

                <Card>

                    <PaymentHistory

                        data={historyPayment}

                        loading={loading}

                    />

                </Card>

            </div>

            <AssignResidentModal

                open={openAssign}

                house={house}

                loading={saving}

                onSubmit={handleAssignResident}

                residents={availableResidents}

                onClose={() =>

                    setOpenAssign(false)

                }

            />

        </MainLayout>

    );

}