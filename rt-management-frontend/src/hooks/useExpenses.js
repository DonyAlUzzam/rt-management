import {

    useEffect,
    useState

} from "react";

import expenseService from "@/services/expenseService";

import useDebounce from "./useDebounce";

export default function useExpenses() {

    const [

        loading,

        setLoading

    ] = useState(false);

    const [

        saving,

        setSaving

    ] = useState(false);

    const [

        expenses,

        setExpenses

    ] = useState([]);

    const [

        meta,

        setMeta

    ] = useState({});

    const [

        search,

        setSearch

    ] = useState("");

    const debouncedSearch =
        useDebounce(search, 500);

    const fetchExpenses = async (

        page = 1

    ) => {

        try {

            setLoading(true);

            const response =
                await expenseService.getAll({

                    page,

                    search: debouncedSearch

                });

            setExpenses(

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

        fetchExpenses();

    }, []);

    useEffect(() => {

        fetchExpenses(1);

    }, [

        debouncedSearch

    ]);

    const createExpense = async (

        payload

    ) => {

        try {

            setSaving(true);

            await expenseService.create(

                payload

            );

            await fetchExpenses();

            return {

                success: true

            };

        }

        catch (error) {

            return {

                success: false,

                errors:
                    error.response?.data?.errors,

                message:
                    error.response?.data?.message

            };

        }

        finally {

            setSaving(false);

        }

    };

    const updateExpense = async (

        id,

        payload

    ) => {

        try {

            setSaving(true);

            await expenseService.update(

                id,

                payload

            );

            await fetchExpenses();

            return {

                success: true

            };

        }

        catch (error) {

            return {

                success: false,

                errors:
                    error.response?.data?.errors,

                message:
                    error.response?.data?.message

            };

        }

        finally {

            setSaving(false);

        }

    };

    const deleteExpense = async (

        id

    ) => {

        try {

            await expenseService.delete(id);

            await fetchExpenses();

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

    return {

        loading,

        saving,

        expenses,

        meta,

        search,

        setSearch,

        fetchExpenses,

        createExpense,

        updateExpense,

        deleteExpense

    };

}