import api from "@/api/axios";

const residentService = {

    getAll(params = {}) {

        return api.get("/residents", {
            params
        });

    },

    show(id) {

        return api.get(`/residents/${id}`);

    },

    create(data) {

        return api.post(
            "/residents",
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

    },

    update(id, data) {

        return api.post(
            `/residents/${id}?_method=PUT`,
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

    },

    delete(id) {

        return api.delete(`/residents/${id}`);

    }

};

export default residentService;