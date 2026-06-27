import api from "@/api/axios";

const paymentService = {

    getPending(params = {}) {

        return api.get("/bills", {

            params: {

                ...params,

                status: "unpaid"

            }

        });

    },

    getHistory(params = {}) {

        return api.get("/payments", {

            params

        });

    },

    create(data) {

        return api.post(

            "/payments",

            data,

            {

                headers: {

                    "Content-Type":

                        "multipart/form-data"

                }

            }

        );

    },

    show(id) {

        return api.get(

            `/payments/${id}`

        );

    },

    delete(id) {

        return api.delete(

            `/payments/${id}`

        );

    }

};

export default paymentService;