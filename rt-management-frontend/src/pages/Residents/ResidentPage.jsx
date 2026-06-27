import { useState } from "react";

import MainLayout from "@/layouts/MainLayout";

import {

    Card,
    Button,
    PageHeader,
    FormModal,
    CrudToolbar,
    Pagination,
    confirmDelete

} from "@/components/common";

import useResidents from "@/hooks/useResidents";

import ResidentTable from "./ResidentTable";

import ResidentForm from "./ResidentForm";

export default function ResidentPage() {

    const {

    loading,

    saving,

    residents,

    meta,

    search,

    setSearch,

    fetchResidents,

    createResident,

    updateResident,

    deleteResident

} = useResidents();

    const [openModal, setOpenModal] = useState(false);

    const [selectedResident, setSelectedResident] = useState(null);

    const handleCreate = () => {

        setSelectedResident(null);

        setOpenModal(true);

    };

    const handleEdit = (resident) => {

        setSelectedResident(resident);

        setOpenModal(true);

    };

    const handleDelete = (resident) => {

        confirmDelete(async () => {

            console.log("Deleting :", resident);
            await deleteResident(resident.id);
        });

    };

    const handleClose = () => {

        setOpenModal(false);

    };

    const handleSubmit = async (formData) => {

        let result;

        if (selectedResident) {

            result = await updateResident(

                selectedResident.id,

                formData

            );

        }

        else {

            result = await createResident(

                formData

            );

        }

        if (result.success) {

            handleClose();

        }

    };

    return (

        <MainLayout>

            <PageHeader

                title="Residents"

                subtitle="Manage resident data"

            />

            <Card>

                <CrudToolbar

                    search={search}

                    onSearch={setSearch}

                    addLabel="Add Resident"

                    onAdd={handleCreate}

                />

                <ResidentTable

                    data={residents}

                    loading={loading}

                    onEdit={handleEdit}

                    onDelete={handleDelete}

                />

                <Pagination

                    meta={meta}

                    onChange={fetchResidents}

                />

            </Card>

            <FormModal

                open={openModal}

                title={

                    selectedResident

                        ? "Edit Resident"

                        : "Add Resident"

                }

                onClose={handleClose}

            >

                <ResidentForm

                    initialData={selectedResident}

                    onSubmit={handleSubmit}

                />

            </FormModal>

        </MainLayout>

    );

}