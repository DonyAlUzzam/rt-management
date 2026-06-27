import {

    FormModal,

    Badge

} from "@/components/common";

import { formatDate } from "@/utils/date";

import { formatCurrency } from "@/utils/currency";

export default function PaymentDetailModal({

    open,

    payment,

    onClose

}) {

    return (

        <FormModal

            open={open}

            title="Payment Detail"

            onClose={onClose}

        >

             {

                !payment ? (

                    <div className="text-center py-10">

                        Loading...

                    </div>

                ) : (
                    <div className="space-y-6">

                        <div className="grid grid-cols-2 gap-5">

                            <div>

                                <label className="text-sm text-gray-500">

                                    Receipt Number

                                </label>

                                <p className="font-medium">

                                    {

                                        payment.receipt_number

                                    }

                                </p>

                            </div>

                            <div>

                                <label className="text-sm text-gray-500">

                                    Payment Date

                                </label>

                                <p className="font-medium">

                                    {

                                        formatDate(payment.payment_date)

                                    }

                                </p>

                            </div>

                            <div>

                                <label className="text-sm text-gray-500">

                                    Resident

                                </label>

                                <p className="font-medium">

                                    {

                                        payment.resident

                                            ?.full_name

                                    }

                                </p>

                            </div>

                            <div>

                                <label className="text-sm text-gray-500">

                                    Status

                                </label>

                                <Badge

                                    variant="success"

                                >

                                    Paid

                                </Badge>

                            </div>

                        </div>

                        {

                            payment.notes && (

                                <div>

                                    <label className="text-sm text-gray-500">

                                        Notes

                                    </label>

                                    <p className="mt-1">

                                        {

                                            payment.notes

                                        }

                                    </p>

                                </div>

                            )

                        }

                        <div

                            className="

                                flex

                                justify-between

                                text-lg

                                font-semibold

                                border-t

                                pt-4

                            "

                        >

                            <span>

                                Total

                            </span>

                            <span>

                                {

                                    formatCurrency(

                                        payment.total_amount

                                    )

                                }

                            </span>

                        </div>

                    </div>

                )

            }

            

        </FormModal>

    );

}