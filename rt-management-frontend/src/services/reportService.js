import api from "@/api/axios";

const reportService = {

    monthly(params = {}) {

        return api.get(
            "/reports/monthly-detail",
            {
                params
            }
        );

    }

};

export default reportService;