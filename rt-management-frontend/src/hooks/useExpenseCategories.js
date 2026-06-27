import {

    useEffect,
    useState

} from "react";

import expenseCategoryService from "@/services/expenseCategoryService";

export default function useExpenseCategories() {

    const [

        categories,

        setCategories

    ] = useState([]);

    const [

        loading,

        setLoading

    ] = useState(false);

    const [

        saving,

        setSaving

    ] = useState(false);

    const fetchCategories = async () => {

        try {

            setLoading(true);

            const response =
                await expenseCategoryService.getAll();
            setCategories(

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

    const createCategory = async (payload) => {

        try {

            setSaving(true);

            await expenseCategoryService.create(payload);

            await fetchCategories();

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

    useEffect(() => {

        fetchCategories();

    }, []);

    return {

        categories,

        loading,

        saving,

        fetchCategories,

        createCategory

    };

}