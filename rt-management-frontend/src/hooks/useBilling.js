import {

    useEffect,

    useState

} from "react";

import billingService from "@/services/billingService";

import useDebounce from "./useDebounce";

export default function useBillings() {

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [billings, setBillings] = useState([]);

    const [meta, setMeta] = useState({});

    const [search, setSearch] = useState("");

    const debouncedSearch =
        useDebounce(search, 500);

    const fetchBillings = async (

        page = 1

    ) => {

        try {

            setLoading(true);

            const response =
                await billingService.getAll({

                    page,

                    search: debouncedSearch

                });

            setBillings(

                response.data.data

            );

            setMeta(

                response.data.meta

            );

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchBillings();

    }, []);

    useEffect(() => {

        fetchBillings(1);

    }, [debouncedSearch]);

    const deleteBilling = async (

        id

    ) => {

        try {

            await billingService.delete(id);

            await fetchBillings();

            return {

                success: true

            };

        }

        catch (error) {

            return {

                success: false,

                message:
                    error.response?.data?.message

            };

        }

    };

    const generateBilling = async (

        payload

    ) => {

        try {

            setSaving(true);

            await billingService.generate(

                payload

            );

            await fetchBillings();

            return {

                success: true

            };

        }

        catch (error) {

            return {

                success: false,

                message:
                    error.response?.data?.message

            };

        }

        finally {

            setSaving(false);

        }

    };

    return {

        loading,

        saving,

        billings,

        meta,

        search,

        setSearch,

        fetchBillings,

        deleteBilling,

        generateBilling

    };

}