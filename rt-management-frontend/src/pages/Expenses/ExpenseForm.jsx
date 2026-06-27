import {

    useEffect

} from "react";

import {

    useForm,
    Controller

} from "react-hook-form";

import {

    Input,
    Select,
    TextArea,
    Button

} from "@/components/common";

export default function ExpenseForm({

    initialData,

    categories = [],

    loading = false,

    onSubmit,
    onCreateCategory

}) {

    const {

        register,

        handleSubmit,

        control,

        reset,

        formState: {

            errors

        }

    } = useForm({

        defaultValues: {

            expense_category_id: "",

            expense_date:
                new Date()

                    .toISOString()

                    .split("T")[0],

            amount: "",

            description: ""

        }

    });

    useEffect(() => {

        if (

           initialData &&

            Object.keys(initialData).length > 0

        ) {

            reset({

                expense_category_id:
                    initialData.expense_category_id,

                expense_date:

                    initialData.expense_date

                        ?.split("T")[0],

                amount:
                    initialData.amount,

                description:
                    initialData.description

            });

        }

        else {

            reset({

                expense_category_id: "",

                expense_date:
                    new Date()

                        .toISOString()

                        .split("T")[0],

                amount: "",

                description: ""

            });

        }

    }, [

        initialData,

        reset

    ]);

    return (

        <form

            onSubmit={

                handleSubmit(

                    onSubmit

                )

            }

            className="space-y-5"

        >

            <Controller

                name="expense_category_id"

                control={control}

                rules={{

                    required:

                        "Category is required"

                }}

                render={({ field }) => (
                    <>

                        <Select

                            label="Category"

                            placeholder="Select Category"

                            options={categories}

                            optionLabel="name"

                            optionValue="id"
                            value={String(field.value ?? "")}

                            onChange={(e)=>

                                field.onChange(

                                    Number(e.target.value)

                                )

                            }

                            error={

                                errors

                                    .expense_category_id

                                    ?.message

                            }

                        />
                        <div className="flex justify-end">

                            <button 

                                type="button"

                                onClick={onCreateCategory}

                                className="
                                    text-sm
                                    text-blue-600
                                    hover:underline
                                "

                            >

                                + Add Category

                            </button>

                        </div>
                    </>

                )}

            />

            <Input

                type="date"

                label="Expense Date"

                error={

                    errors

                        .expense_date

                        ?.message

                }

                {

                    ...register(

                        "expense_date",

                        {

                            required:

                                "Expense date is required"

                        }

                    )

                }

            />

            <Input

                type="number"

                label="Amount"

                placeholder="500000"

                error={

                    errors

                        .amount

                        ?.message

                }

                {

                    ...register(

                        "amount",

                        {

                            required:

                                "Amount is required",

                            min: {

                                value: 1,

                                message:

                                    "Amount must be greater than 0"

                            }

                        }

                    )

                }

            />

            <TextArea

                label="Description"

                rows={4}

                error={

                    errors

                        .description

                        ?.message

                }

                {

                    ...register(

                        "description",

                        {

                            required:

                                "Description is required"

                        }

                    )

                }

            />

            <div className="flex justify-end">

                <Button

                    type="submit"

                    loading={loading}

                >

                    Save

                </Button>

            </div>

        </form>

    );

}