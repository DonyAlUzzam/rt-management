import {

    useEffect

} from "react";

import MONTHS from "../../constants/months";

import {

    useForm,

    Controller

} from "react-hook-form";

import {

    FormModal,

    Input,

    Select,

    Button

} from "@/components/common";

export default function BillingGenerateModal({

    open,

    loading,

    onClose,

    onSubmit

}) {

    const {
        control,

        register,

        handleSubmit,

        reset,

        formState: {

            errors

        }

    } = useForm({

        defaultValues: {

            month:

                new Date().getMonth() + 1,

            year:

                new Date().getFullYear()

        }

    });

    useEffect(() => {

        if (open) {

            reset({

                month:

                    new Date().getMonth() + 1,

                year:

                    new Date().getFullYear()

            });

        }

    }, [

        open,

        reset

    ]);

    return (

        <FormModal

            open={open}

            title="Generate Billing"

            onClose={onClose}

        >

            <form

                onSubmit={

                    handleSubmit(onSubmit)

                }

                className="space-y-5"

            >

                <Controller

                    name="month"

                    control={control}

                    rules={{

                        required: "Month is required"

                    }}

                    render={({ field }) => (

                        <Select

                            label="Month"

                            options={MONTHS}

                            optionLabel="label"

                            optionValue="value"

                            error={errors.month?.message}

                            {...field}

                        />

                    )}

                />

                <Input

                    label="Year"

                    type="number"

                    error={

                        errors.year?.message

                    }

                    {

                        ...register(

                            "year",

                            {

                                required:

                                    "Year is required"

                            }

                        )

                    }

                />

                <div className="flex justify-end gap-3">

                    <Button

                        type="button"

                        variant="secondary"

                        onClick={onClose}

                    >

                        Cancel

                    </Button>

                    <Button

                        type="submit"

                        loading={loading}

                    >

                        Generate

                    </Button>

                </div>

            </form>

        </FormModal>

    );

}