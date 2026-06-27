import {

    FormModal

} from "@/components/common";

import ExpenseCategoryForm from "./ExpenseCategoryForm";

import ExpenseCategoryTable from "./ExpenseCategoryTable";

export default function ExpenseCategoryModal({

    open,

    categories,

    loading,

    saving,

    onSubmit,

    onClose

}) {

    return (

        <FormModal

            open={open}

            title="Expense Categories"

            onClose={onClose}

        >

            <div className="space-y-6">

                <ExpenseCategoryForm

                    onSubmit={onSubmit}

                    loading={saving}

                />

                <div>

                    <h3

                        className="

                            text-lg

                            font-semibold

                            mb-3

                        "

                    >

                        Category List

                    </h3>

                    <ExpenseCategoryTable

                        data={categories}

                        loading={loading}

                    />

                </div>

            </div>

        </FormModal>

    );

}