import api from "@/api/axios";

const endpoint = "/bills";

const billingService = {

    getAll(params = {}) {

        return api.get(endpoint, {

            params

        });

    },

    getById(id) {

        return api.get(

            `${endpoint}/${id}`

        );

    },

    update(id, data) {

        return api.put(

            `${endpoint}/${id}`,

            data

        );

    },

    delete(id) {

        return api.delete(

            `${endpoint}/${id}`

        );

    },

    generate(data) {

        return api.post(

            `billing/generate`,

            data

        );

    }

};

export default billingService;