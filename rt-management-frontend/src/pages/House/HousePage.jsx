import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import {

    Card,

    PageHeader,

    FormModal,

    CrudToolbar,

    Pagination,

    confirmDelete

} from "@/components/common";

import useHouses from "@/hooks/useHouses";

import HouseTable from "./HouseTable";

import HouseForm from "./HouseForm";

export default function HousePage() {

    const {

        loading,

        saving,

        houses,

        meta,

        search,

        setSearch,

        createHouse,

        updateHouse,

        deleteHouse,

        fetchHouses

    } = useHouses();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    const [selectedHouse, setSelectedHouse] = useState(null);

    const handleCreate = () => {

        setSelectedHouse(null);

        setOpenModal(true);

    };

    const handleEdit = (house) => {

        setSelectedHouse(house);

        setOpenModal(true);

    };

    const handleDelete = (house) => {

        confirmDelete(async () => {

            const result =
                await deleteHouse(house.id);

            if (result.success) {

                console.log("House deleted");

            }

        });

    };

    const handleClose = () => {

        setOpenModal(false);

        setSelectedHouse(null);

    };

    const handleSubmit = async (

        data

    ) => {

        let result;

        if (selectedHouse) {

            result = await updateHouse(

                selectedHouse.id,

                data

            );

        }

        else {

            result =
                await createHouse(data);

        }

        if (result.success) {

            handleClose();

        }

    };

    const handleDetail = (row) => {
        navigate(`/houses/${row.id}`);
    };

    return (

        <MainLayout>

            <PageHeader

                title="House"

                subtitle="Manage house data"

            />

            <Card>

                <CrudToolbar

                    search={search}

                    onSearch={setSearch}

                    addLabel="Add House"

                    onAdd={handleCreate}

                />

                <HouseTable

                    data={houses}

                    loading={loading}

                    onEdit={handleEdit}

                    onDelete={handleDelete}

                    onDetail={handleDetail}

                />

                <Pagination

                    meta={meta}

                    onChange={fetchHouses}

                />

            </Card>

            <FormModal

                open={openModal}

                title={

                    selectedHouse

                        ? "Edit House"

                        : "Add House"

                }

                onClose={handleClose}

            >

                <HouseForm

                    initialData={selectedHouse}

                    loading={saving}

                    onSubmit={handleSubmit}

                />

            </FormModal>

        </MainLayout>

    );

}