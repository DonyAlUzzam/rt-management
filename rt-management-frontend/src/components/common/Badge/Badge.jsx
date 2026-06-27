const variants = {
    success: "bg-green-100 text-green-700",

    danger: "bg-red-100 text-red-700",

    warning: "bg-yellow-100 text-yellow-700",

    primary: "bg-blue-100 text-blue-700",

    secondary: "bg-gray-100 text-gray-700",
};

export default function Badge({

    children,

    variant = "primary",

}) {

    return (

        <span

            className={`
                inline-flex
                items-center
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                ${variants[variant]}
            `}
        >

            {children}

        </span>

    );

}