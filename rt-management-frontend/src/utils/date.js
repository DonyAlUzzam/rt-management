import MONTHS from '../constants/months';

export function formatDate(date) {

    if (!date) return "-";

    return new Intl.DateTimeFormat("id-ID", {

        day: "2-digit",

        month: "short",

        year: "numeric"

    }).format(new Date(date));

}

export function getMonthName(month) {

    return MONTHS.find(

        item => item.value == month

    )?.label ?? "-";

}