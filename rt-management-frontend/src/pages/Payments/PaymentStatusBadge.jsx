import { Badge } from "@/components/common";

export default function PaymentStatusBadge({

    status

}) {

    const variants = {

        paid: "success",

        pending: "warning",

        failed: "danger"

    };

    return (

        <Badge

            variant={

                variants[status] ??

                "secondary"

            }

        >

            {

                status

                    ?.charAt(0)

                    .toUpperCase()

                +

                status?.slice(1)

            }

        </Badge>

    );

}