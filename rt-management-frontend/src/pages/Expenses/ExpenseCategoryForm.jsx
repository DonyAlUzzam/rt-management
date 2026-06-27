import {

    Button,
    Input

} from "@/components/common";

import {

    useForm

} from "react-hook-form";

export default function ExpenseCategoryForm({

    onSubmit,

    loading

}) {

    const {

        register,

        handleSubmit,

        reset,

        formState: {

            errors

        }

    } = useForm();

    const submit = async (data) => {

        const result = await onSubmit(data);

        if (result?.success) {

            reset();

        }

    };

    return (

        <form

            onSubmit={handleSubmit(submit)}

            className="space-y-4"

        >

            <Input

                label="Category Name"

                placeholder="Maintenance"

                error={errors.name?.message}

                {

                    ...register(

                        "name",

                        {

                            required:

                                "Category name is required"

                        }

                    )

                }

            />

            <Input

                label="Description"

                placeholder="Optional"

                {

                    ...register(

                        "description"

                    )

                }

            />

            <div className="flex justify-end">

                <Button

                    type="submit"

                    loading={loading}

                >

                    Add Category

                </Button>

            </div>

        </form>

    );

}