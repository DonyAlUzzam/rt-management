import { useEffect } from "react";

import {

    Button,

    Input,

    Select

} from "@/components/common";

import {

    useForm,

    Controller

} from "react-hook-form";

export default function HouseForm({

    initialData = {},

    residents = [],

    onSubmit,

    loading = false

}) {

    const {

        register,

        control,

        handleSubmit,

        watch,

        reset,

        formState: {

            errors

        }

    } = useForm({

        defaultValues: {

            house_number: "",

            address: "",

            status: "vacant",

        }

    });

    useEffect(() => {

        reset({

            house_number:

                initialData?.house_number ?? "",

            address:

                initialData?.address ?? "",


            status:

                initialData?.status ?? "vacant",

        });

    }, [

        initialData,

        reset

    ]);

    const status = watch("status");

    return (

        <form

            onSubmit={

                handleSubmit(onSubmit)

            }

            className="space-y-5"

        >

            <Input

                label="House Number"

                placeholder="Example : A-01"

                error={

                    errors.house_number?.message

                }

                {

                    ...register(

                        "house_number",

                        {

                            required:

                                "House number is required"

                        }

                    )

                }

            />

            <Input

                label="Address"

                placeholder="Example : A"

                error={

                    errors.address?.message

                }

                {

                    ...register(

                        "address",

                        {

                            required:

                                "Address is required"

                        }

                    )

                }

            />

            <Controller

                control={control}

                name="status"

                rules={{

                    required:

                        "Status is required"

                }}

                render={({ field }) => (

                    <Select

                        label="Status"

                        options={[

                            {

                                label: "Occupied",

                                value: "occupied"

                            },

                            {

                                label: "Vacant",

                                value: "vacant"

                            }

                        ]}

                        error={

                            errors.status?.message

                        }

                        {

                            ...field

                        }

                    />

                )}

            />

            {

                status === "occupied" && (

                    <Controller

                        control={control}

                        name="resident_id"

                        rules={{

                            required:

                                "Resident is required"

                        }}

                        render={({ field }) => (

                            <Select

                                label="Resident"

                                options={

                                    residents

                                }

                                optionLabel="full_name"

                                optionValue="id"

                                placeholder="Select Resident"

                                error={

                                    errors.resident_id?.message

                                }

                                {

                                    ...field

                                }

                            />

                        )}

                    />

                )

            }

            <div

                className="

                    flex

                    justify-end

                "

            >

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