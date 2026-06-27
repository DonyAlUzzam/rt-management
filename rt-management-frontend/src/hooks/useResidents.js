import { useEffect, useState } from "react";

import residentService from "@/services/residentService";

import useDebounce from "./useDebounce";

export default function useResidents() {

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [residents, setResidents] = useState([]);

    const [meta, setMeta] = useState({});

    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 500);

    const fetchResidents = async (page = 1) => {

        try {

            setLoading(true);

            const response =
                await residentService.getAll({

                    page,

                    search: debouncedSearch

                });

            setResidents(response.data.data);

            setMeta(response.data.meta);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchResidents(1);

    }, [debouncedSearch]);

    const createResident = async (formData) => {

        try {

            setSaving(true);

            await residentService.create(formData);

            await fetchResidents();

            return {

                success: true

            };

        }

        catch (error) {

            return {

                success: false,

                errors: error.response?.data?.errors,

                message: error.response?.data?.message

            };

        }

        finally {

            setSaving(false);

        }

    };

    const updateResident = async (

        id,

        formData

    ) => {

        try {

            setSaving(true);

            await residentService.update(

                id,

                formData

            );

            await fetchResidents();

            return {

                success: true

            };

        }

        catch (error) {

            return {

                success: false,

                errors: error.response?.data?.errors,

                message: error.response?.data?.message

            };

        }

        finally {

            setSaving(false);

        }

    };

    const deleteResident = async (id) => {

        try {

            setLoading(true);

            await residentService.delete(id);

            await fetchResidents();

            return {

                success: true

            };

        }

        catch (error) {

            return {

                success: false,

                message: error.response?.data?.message

            };

        }

        finally {

            setLoading(false);

        }

    };

    return {

        loading,

        saving,

        residents,

        meta,

        search,

        setSearch,

        fetchResidents,

        createResident,

        updateResident,

        deleteResident

    };

}