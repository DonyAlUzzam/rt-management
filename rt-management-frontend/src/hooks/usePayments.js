import {

    useEffect,

    useState

} from "react";

import paymentService from "@/services/paymentService";

import useDebounce from "./useDebounce";

export default function usePayments() {

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [

        payments,

        setPayments

    ] = useState([]);

    const [

        meta,

        setMeta

    ] = useState({});


    const [

        history,

        setHistory

    ] = useState([]);

    const [

        historyMeta,

        setHistoryMeta

    ] = useState({});

    const [

        search,

        setSearch

    ] = useState("");

    const debouncedSearch =

        useDebounce(

            search,

            500

        );

    const fetchPayments = async (

        page = 1

    ) => {

        try {

            setLoading(true);

            const response =

                await paymentService.getPending({

                    page,

                    search:

                        debouncedSearch

                });

            setPayments(

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

    const fetchHistory = async (

        page = 1

    ) => {

        try {

            setLoading(true);

            const response =

                await paymentService.getHistory({

                    page,

                    search:

                        debouncedSearch

                });

            setHistory(

                response.data.data

            );

            setHistoryMeta(

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

    const fetchPaymentDetail = async (id) => {

        const response =
            await paymentService.show(id);

        return response.data.data;

    };

    useEffect(() => {

        fetchPayments();

        fetchHistory();

    }, []);

    useEffect(() => {

        fetchPayments(1);

        fetchHistory(1);

    }, [

        debouncedSearch

    ]);

    const createPayment = async (

        formData

    ) => {

        try {

            setSaving(true);

            await paymentService.create(

                formData

            );

            await Promise.all([

                fetchPayments(),

                fetchHistory()

            ]);

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

    const deletePayment = async (

        id

    ) => {

        try {

            await paymentService.delete(id);

            await fetchHistory();

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

        search,

        setSearch,

        payments,

        meta,

        history,

        historyMeta,

        fetchPayments,

        fetchHistory,
        fetchPaymentDetail,

        createPayment,

        deletePayment

    };

}