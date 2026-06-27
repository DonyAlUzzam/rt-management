import {

    useEffect

} from "react";

import {

    useForm

} from "react-hook-form";

import {

    FormModal,

    Input,

    Button,

    TextArea,

    Select,

    FileUpload

} from "@/components/common";

const METHODS = [

    {

        value: "cash",

        label: "Cash"

    },

    {

        value: "transfer",

        label: "Bank Transfer"

    },

    {

        value: "ewallet",

        label: "E-Wallet"

    }

];

export default function PaymentForm({

    open,

    billings = [],

    loading,

    onSubmit,

    onClose

}) {

    const billing = billings?.[0];

    const resident = billing?.resident;

    const house = billing?.house;

    const totalAmount = billings.reduce(

        (total, item) =>

            total + Number(item.amount),

        0

    );

    const {

        register,

        handleSubmit,

        reset

    } = useForm({

        defaultValues: {
            

            resident_id: "",

            payment_date:

                new Date()

                    .toISOString()

                    .split("T")[0]

        }

    });
    

    useEffect(() => {

         if (

        open && resident

        ) {

            reset({

                resident_id: resident.id,

                payment_date:
                    new Date()
                        .toISOString()
                        .split("T")[0]

            });

        }

    },[

        open,
        resident,

        reset

    ]);


    const submit = (data)=>{
        onSubmit({

            ...data,

            bill_ids: billings.map(

                bill => bill.id

            ),
            resident_id: resident?.id

        });

    };


    return(

        <FormModal

            open={open}

            title="Payment"

            onClose={onClose}

        >

            <form

                onSubmit={

                    handleSubmit(submit)

                }

                className="space-y-4"

            >

                <Input
                    label="Resident"
                    value={resident?.full_name ?? ""}
                    readOnly
                />

                <Input
                    label="House"
                    value={house?.house_number ?? ""}
                    readOnly
                />

                <Input
                    label="Total Amount"
                    value={totalAmount}
                    readOnly
                />

                <Input

                    type="date"

                    label="Payment Date"

                    {

                        ...register(

                            "payment_date"

                        )

                    }

                />

                {/* <Select

                    label="Payment Method"

                    options={METHODS}

                    {

                        ...register(

                            "payment_method"

                        )

                    }

                /> */}


                <TextArea

                    label="Notes"

                    rows={4}

                    {

                        ...register(

                            "notes"

                        )

                    }

                />

                {/* <FileUpload

                    label="Proof"

                    {

                        ...register(

                            "proof"

                        )

                    }

                /> */}

                <div>

                    <label className="block text-sm font-medium mb-2">

                        Billing Period

                    </label>

                    <div className="space-y-2">

                        {

                            billings.map(

                                bill => (

                                    <div

                                        key={bill.id}

                                        className="flex justify-between rounded-md bg-gray-50 px-3 py-2"

                                    >

                                        <span>

                                            {bill.period_month}/{bill.period_year}

                                        </span>

                                        <span>

                                            Rp {bill.amount}

                                        </span>

                                    </div>

                                )

                            )

                        }

                    </div>

                </div>

                <div className="flex justify-end">

                    <Button

                        type="submit"

                        loading={loading}

                    >

                        Submit Payment

                    </Button>

                </div>

            </form>

        </FormModal>

    );

}