import { Badge } from "@/components/common";

export default function BillingStatusBadge({

    status

}) {

    const variants = {

        unpaid: "danger",

        paid: "success",

        partial: "warning"

    };

    const labels = {

        unpaid: "Unpaid",

        paid: "Paid",

        partial: "Partial"

    };

    return (

        <Badge

            variant={

                variants[status] ??

                "secondary"

            }

        >

            {

                labels[status] ??

                status

            }

        </Badge>

    );

}