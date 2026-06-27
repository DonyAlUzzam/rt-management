import {

    useEffect,

    useState

} from "react";

import houseService from "@/services/houseService";

import useDebounce from "./useDebounce";

export default function useHouses() {

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [houses, setHouses] = useState([]);

    const [house, setHouse] = useState(null);

    const [historyPayment, setHistoryPayment] = useState(null);

    const [meta, setMeta] = useState({});

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const debouncedSearch =
        useDebounce(search, 500);

    const fetchHouses = async (

        page = currentPage

    ) => {

        try {

            setLoading(true);

            setCurrentPage(page);

            const response =
                await houseService.getAll({

                    page,

                    search:

                        debouncedSearch

                });

            setHouses(

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

    const getHouse = async (id) => {

        try {

            setLoading(true);

            const response =
                await houseService.getById(id);
            setHouse(response.data.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const getPaymentHistory = async (id) => {

        try {

            setLoading(true);

            const response =
                await houseService.getHistory(id);
            setHistoryPayment(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchHouses(1);

    }, [

        debouncedSearch

    ]);

    const createHouse = async (

        data

    ) => {

        try {

            setSaving(true);

            await houseService.create(

                data

            );

            await fetchHouses(

                currentPage

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

    const updateHouse = async (

        id,

        data

    ) => {

        try {

            setSaving(true);

            await houseService.update(

                id,

                data

            );

            await fetchHouses(

                currentPage

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

    const deleteHouse = async (

        id

    ) => {

        try {

            setLoading(true);

            await houseService.delete(

                id

            );

            await fetchHouses(

                currentPage

            );

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

            setLoading(false);

        }

    };

    return {

        loading,

        saving,

        houses,

        meta,

        search,

        house,

        historyPayment,

        getHouse,

        getPaymentHistory,

        setSearch,

        fetchHouses,

        createHouse,

        updateHouse,

        deleteHouse

    };

}