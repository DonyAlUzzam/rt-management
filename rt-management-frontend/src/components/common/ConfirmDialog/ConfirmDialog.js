import Swal from "sweetalert2";

export function confirmDelete(callback) {
    Swal.fire({
        title: "Delete Data?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2563eb",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Delete",
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
}

export function confirmCheckout(callback) {
    Swal.fire({
        title: "Checkout Resident?",
        text: "Resident will be checked out from this house.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2563eb",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Checkout",
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
}