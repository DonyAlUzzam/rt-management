import { useState } from "react";

import MainLayout from "@/layouts/MainLayout";

import {

    Card,

    PageHeader,

    CrudToolbar,

    Pagination,

    Button

} from "@/components/common";

import useBilling from "@/hooks/useBilling";
import BillingTable from "./BillingTable";
import BillingGenerateModal from "./BillingGenerateModal";

export default function BillingPage() {

    const {

        loading,

        billings,

        meta,

        search,

        setSearch,

        fetchBillings,

        generateBilling

    } = useBilling();

    const [openModal, setOpenModal] = useState(false);

    const handleClose = () => {

        setOpenModal(false);

    };

    const handleGenerate = () => {

        setOpenModal(true);

    };

    const handleSubmit = async (payload) => {

        const generate = await generateBilling(payload);

        if (generate.success) {

            setOpenModal(false);

            await fetchBillings();

        }

    };

    return (

        <MainLayout>

            <PageHeader

                title="Billing"

                subtitle="Manage monthly billings"

            />

            <Card>

                <CrudToolbar

                    search={search}

                    onSearch={setSearch}

                    addLabel="Generate Billing"

                    onAdd={handleGenerate}

                />

                <BillingTable 
                    data={billings}

                    loading={loading}

                />
                <Pagination

                    meta={meta}

                    onChange={fetchBillings}

                />

                <BillingGenerateModal
                
                    open={openModal}
    
                    onSubmit={handleSubmit}
    
                    onClose={() =>
    
                        setOpenModal(false)
    
                    }
    
                />

            </Card>

        </MainLayout>

    );

}