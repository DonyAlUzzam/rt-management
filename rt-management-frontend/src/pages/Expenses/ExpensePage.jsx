import {

    useState

} from "react";

import MainLayout from "@/layouts/MainLayout";

import {

    Card,

    PageHeader,

    CrudToolbar,

    Pagination,

    FormModal,

    confirmDelete

} from "@/components/common";

import ExpenseTable from "./ExpenseTable";

import ExpenseForm from "./ExpenseForm";

import ExpenseCategoryModal from "./ExpenseCategoryModal";

import useExpenses from "@/hooks/useExpenses";

import useExpenseCategories from "@/hooks/useExpenseCategories";

export default function ExpensePage() {

    const {

        expenses,

        meta,

        loading,

        saving,

        search,

        setSearch,

        fetchExpenses,

        createExpense,

        updateExpense,

        deleteExpense

    } = useExpenses();

    const {

        categories,

        loading: categoryLoading,

        saving: categorySaving,

        createCategory

    } = useExpenseCategories();

    const [

        openModal,

        setOpenModal

    ] = useState(false);

    const [

        openCategory,

        setOpenCategory

    ] = useState(false);

    const [

        selectedExpense,

        setSelectedExpense

    ] = useState(null);

    const handleCreate = () => {

        setSelectedExpense(null);

        setOpenModal(true);

    };

    const handleEdit = (

        expense

    ) => {

        setSelectedExpense(expense);

        setOpenModal(true);

    };

    const handleOpenCategory = () => {

        setOpenCategory(true);

    };

    const handleCloseCategory = () => {

        setOpenCategory(false);

    };

    const handleCreateCategory = async (data) => {

        const result = await createCategory(data);

        if (result.success) {

            setOpenCategory(false);

        }

        return result;

    };

    const handleSubmit = async (

        data

    ) => {

        let result;

        if (

            selectedExpense

        ) {

            result =

                await updateExpense(

                    selectedExpense.id,

                    data

                );

        }

        else {

            result =

                await createExpense(

                    data

                );

        }

        if (

            result.success

        ) {

            setOpenModal(false);

        }

    };

    return (

        <MainLayout>

            <PageHeader

                title="Expenses"

                subtitle="Manage expense transactions"

            />

            <Card>

                <CrudToolbar

                    search={search}

                    onSearch={setSearch}

                    addLabel="Add Expense"

                    onAdd={handleCreate}

                >

                    <button

                        onClick={() =>

                            setOpenCategory(

                                true

                            )

                        }

                        className="btn btn-secondary"

                    >

                        Categories

                    </button>

                </CrudToolbar>

                <ExpenseTable

                    data={expenses}

                    loading={loading}

                    onEdit={handleEdit}

                />

                <Pagination

                    meta={meta}

                    onChange={fetchExpenses}

                />

            </Card>

            <FormModal

                open={openModal}

                title={

                    selectedExpense

                        ? "Edit Expense"

                        : "Add Expense"

                }

                onClose={() =>

                    setOpenModal(false)

                }

            >

                <ExpenseForm

                    initialData={

                        selectedExpense

                    }

                    categories={

                        categories

                    }

                    loading={saving}

                    onSubmit={

                        handleSubmit

                    }

                    onCreateCategory={handleOpenCategory}

                />

            </FormModal>

            <ExpenseCategoryModal
                open={openCategory}
                categories={categories}
                loading={categoryLoading}
                saving={categorySaving}
                onSubmit={handleCreateCategory}
                onClose={handleCloseCategory}
            />

        </MainLayout>

    );

}