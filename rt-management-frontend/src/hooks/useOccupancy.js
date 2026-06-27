import { useState } from "react";

import occupancyService from "@/services/occupancyService";

export default function useOccupancy() {

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [availableResidents, setAvailableResidents] = useState([]);

    const [residentHistory, setResidentHistory] = useState([]);

    const getAvailableResidents = async () => {

        try {

            setLoading(true);

            const response =
                await occupancyService.getAvailableResidents();

            setAvailableResidents(
                response.data.data
            );

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const getResidentHistory = async (

        houseId

    ) => {

        try {

            setLoading(true);

            const response =
                await occupancyService.getResidentHistory(
                    houseId
                );
            setResidentHistory(
                response.data
            );

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const assignResident = async (

        payload

    ) => {

        try {

            setSaving(true);

            await occupancyService.assignResident(
                payload
            );

            return {

                success: true

            };

        }

        catch (error) {

            return {

                success: false,

                message:
                    error.response?.data?.message,

                errors:
                    error.response?.data?.errors

            };

        }

        finally {

            setSaving(false);

        }

    };

    const checkoutResident = async (

        occupancyId

    ) => {

        try {

            setSaving(true);

            await occupancyService.checkoutResident(
                occupancyId
            );

            return {

                success: true

            };

        }

        catch (error) {

            return {

                success: false,

                message:
                    error.response?.data?.message,

                errors:
                    error.response?.data?.errors

            };

        }

        finally {

            setSaving(false);

        }

    };

    return {

        loading,

        saving,

        availableResidents,

        residentHistory,

        getAvailableResidents,

        getResidentHistory,

        assignResident,

        checkoutResident

    };

}