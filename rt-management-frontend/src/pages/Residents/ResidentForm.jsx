import { useEffect } from "react";

import {

    Button,
    Input,
    Select,
    FileUpload

} from "@/components/common";

import {

    useForm

} from "react-hook-form";

export default function ResidentForm({

    initialData = {},

    onSubmit,

    loading = false

}) {

    const {

        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: {

            errors

        }

    } = useForm({

        defaultValues: {

            full_name: "",

            resident_type: "",

            phone: "",

            marital_status: "",

            ktp_photo: null
        }

    });

    useEffect(() => {

        reset({

            full_name:
                initialData?.full_name ?? "",

            resident_type:
                initialData?.resident_type ?? "",

            phone:
                initialData?.phone ?? "",

            marital_status:
                initialData?.marital_status ?? "",

            ktp_photo: null

        });

    }, [initialData, reset]);

    const submit = (data) => {

        const formData = new FormData();

        formData.append(

            "full_name",

            data.full_name

        );

        formData.append(

            "resident_type",

            data.resident_type

        );

        formData.append(

            "phone",

            data.phone

        );

        formData.append(

            "marital_status",

            data.marital_status

        );

        if (data.ktp_photo) {

            formData.append(

                "ktp_photo",

                data.ktp_photo

            );

        }

        onSubmit(formData);

    };

    return (

        <form

            onSubmit={handleSubmit(submit)}

            className="space-y-4"

        >

            <Input

                label="Full Name"

                placeholder="Resident full name"

                error={errors.full_name?.message}

                {...register(

                    "full_name",

                    {

                        required:
                            "Full name is required"

                    }

                )}

            />

            <div>

                <Select
                    label="Resident Type"
                    options={[
                        {
                            label: "Tetap",
                            value: "tetap"
                        },
                        {
                            label: "Kontrak",
                            value: "kontrak"
                        }
                    ]}
                    error={errors.resident_type?.message}
                    {...register("resident_type")}
                />

                {

                    errors.resident_type && (

                        <p className="text-sm text-red-500 mt-1">

                            {

                                errors
                                    .resident_type
                                    .message

                            }

                        </p>

                    )

                }

            </div>

            <Input

                label="Phone"

                placeholder="08123456789"

                error={errors.phone?.message}

                {...register(

                    "phone",

                    {

                        required:
                            "Phone is required"

                    }

                )}

            />

            <div>

                <Select
                    label="Marital Status"
                    options={[
                        {
                            label: "Menikah",
                            value: "menikah"
                        },
                        {
                            label: "Belum Menikah",
                            value: "belum_menikah"
                        }
                    ]}
                    error={errors.marital_status?.message}
                    {...register("marital_status")}
                />

                {

                    errors.marital_status && (

                        <p className="text-sm text-red-500 mt-1">

                            {

                                errors
                                    .marital_status
                                    .message

                            }

                        </p>

                    )

                }

            </div>

            <FileUpload

                label="KTP Photo"

                value={watch("ktp_photo")}

                existingImage={

                    initialData?.ktp_photo

                        ? `${import.meta.env.VITE_API_STORAGE}/${initialData.ktp_photo}`

                        : null

                }

                error={

                    errors.ktp_photo?.message

                }

                onChange={(file) => {

                    setValue(

                        "ktp_photo",

                        file,

                        {

                            shouldValidate: true

                        }

                    );

                }}

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