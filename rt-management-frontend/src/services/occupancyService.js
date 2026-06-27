import api from "@/api/axios";

const endpoint = "/occupancies";

const occupancyService = {

    getAvailableResidents() {

        return api.get(

            `${endpoint}/available-residents`

        );

    },

    getResidentHistory(

        houseId

    ) {

        return api.get(

            `/houses/${houseId}/history`

        );

    },

    assignResident(

        data

    ) {

        return api.post(

            `${endpoint}/assign-resident`,

            data

        );

    },

    checkoutResident(

        data

    ) {
        const occupancyId = data.house_id;

        return api.post(

            `${endpoint}/${occupancyId}/checkout`

        );

    }

};

export default occupancyService;