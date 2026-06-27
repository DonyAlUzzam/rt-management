import api from "@/api/axios";

const expenseService = {

    getAll(params = {}) {

        return api.get("/expenses", {
            params
        });

    },

    create(data) {

        return api.post(
            "/expenses",
            data
        );

    },

    update(id, data) {

        return api.put(
            `/expenses/${id}`,
            data
        );

    },

    delete(id) {

        return api.delete(
            `/expenses/${id}`
        );

    }

};

export default expenseService;