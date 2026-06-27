import api from "@/api/axios";

const expenseCategoryService = {

    getAll(params = {}) {

        return api.get("/expense-categories", {

            params

        });

    },

    create(data) {

        return api.post(

            "/expense-categories",

            data

        );

    }

};

export default expenseCategoryService;