import {

    useEffect

} from "react";

import {

    useForm,

    Controller

} from "react-hook-form";

import {

    FormModal,

    Select,

    Input,

    Button

} from "@/components/common";

export default function AssignResidentModal({
    
    open,

    house,

    residents = [],

    loading = false,

    onSubmit,

    onClose

}) {

    const {

        control,

        register,

        reset,

        handleSubmit,

        formState: {

            errors

        }

    } = useForm({

        defaultValues: {

            resident_id: "",

            start_date:
                new Date()

                    .toISOString()

                    .split("T")[0]

        }

    });

    useEffect(() => {

        if (open) {

            reset({

                resident_id: "",

                start_date:
                    new Date()

                        .toISOString()

                        .split("T")[0]

            });

        }

    }, [

        open,

        reset

    ]);

    const submit = (data) => {

        onSubmit({

            ...data,

            house_id: house.id

        });

    };
    return (

        <FormModal

            open={open}

            title="Assign Resident"

            onClose={onClose}

        >

            <form

                onSubmit={

                    handleSubmit(submit)

                }

                className="space-y-5"

            >

                <Controller

                    name="resident_id"

                    control={control}

                    rules={{

                        required:
                            "Resident is required"

                    }}

                    render={({ field }) => (

                        <Select

                            label="Resident"

                            placeholder="Select Resident"

                            options={residents}

                            optionLabel="full_name"

                            optionValue="id"

                            error={
                                errors.resident_id?.message
                            }

                            {...field}

                        />

                    )}

                />

                <Input

                    label="Move In Date"

                    type="date"

                    error={
                        errors.move_in_date?.message
                    }

                    {

                        ...register(

                            "move_in_date",

                            {

                                required:

                                    "Move in date is required"

                            }

                        )

                    }

                />

                <div

                    className="

                        flex

                        justify-end

                        gap-3

                    "

                >

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

                        Assign

                    </Button>

                </div>

            </form>

        </FormModal>

    );

}