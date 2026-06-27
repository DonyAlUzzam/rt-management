import api from "@/api/axios";

const endpoint = "/houses";

const houseService = {

    getAll(params = {}) {

        return api.get(

            endpoint,

            {

                params

            }

        );

    },

    getById(id) {

        return api.get(

            `${endpoint}/${id}`

        );

    },

    create(data) {

        return api.post(

            endpoint,

            data

        );

    },

    update(

        id,

        data

    ) {

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

    getHistory(id) {

        return api.get(

            `${endpoint}/${id}/bills`

        );

    },

};

export default houseService;