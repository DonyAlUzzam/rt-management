import {

    Badge,
    InfoItem

} from "@/components/common";

import {

    FaHome,

    FaUser,

    FaPhone,

    FaMapMarkerAlt

} from "react-icons/fa";

export default function HouseInformation({

    house

}) {

    return (

        <div className="space-y-6">

            <div>

                <h2

                    className="

                        text-lg

                        font-semibold

                        text-gray-800

                    "

                >

                    House Information

                </h2>

                <p

                    className="

                        text-sm

                        text-gray-500

                    "

                >

                    Current house information.

                </p>

            </div>

            <div

                className="

                    grid

                    grid-cols-1

                    md:grid-cols-2

                    gap-6

                "

            >

                {/* House Number */}

                <InfoItem

                    icon={<FaHome />}

                    label="House Number"

                    value={house.house_number}

                />

                {/* Block */}

                <InfoItem

                    icon={<FaMapMarkerAlt />}

                    label="Address"

                    value={house.address || "-"}

                />

                {/* Status */}

                <div>

                    <label

                        className="

                            text-sm

                            text-gray-500

                        "

                    >

                        Status

                    </label>

                    <div className="mt-2">

                        <Badge

                            variant={

                                house.status === "occupied"

                                    ? "success"

                                    : "secondary"

                            }

                        >

                            {

                                house.status === "occupied"

                                    ? "Occupied"

                                    : "Vacant"

                            }

                        </Badge>

                    </div>

                </div>

                {/* Resident */}

                <InfoItem

                    icon={<FaUser />}

                    label="Current Resident"

                    value={

                        house.current_resident?.full_name ??

                        "-"

                    }

                />

                {/* Phone */}

                <InfoItem

                    icon={<FaPhone />}

                    label="Phone"

                    value={

                        house.current_resident?.phone ??

                        "-"

                    }

                />

            </div>

        </div>

    );

}

