export default function Modal({

    open,

    title,

    children,

    footer,

    onClose,

}) {

    if (!open) return null;

    return (

        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/50
            "
        >

            <div
                className="
                    w-full
                    max-w-lg
                    rounded-xl
                    bg-white
                    shadow-lg
                "
            >

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        p-4
                    "
                >

                    <h2
                        className="
                            text-lg
                            font-semibold
                        "
                    >

                        {title}

                    </h2>

                    <button
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <div className="p-5">

                    {children}

                </div>

                {footer && (

                    <div
                        className="
                            flex
                            justify-end
                            gap-2
                            border-t
                            p-4
                        "
                    >

                        {footer}

                    </div>

                )}

            </div>

        </div>

    );

}