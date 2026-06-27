import Modal from "../Modal";

export default function FormModal({
    open,
    title,
    onClose,
    children,
   
    maxWidth = "max-w-2xl",
}) {
    if (!open) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <div
                className={`
                    w-full
                    ${maxWidth}
                    bg-white
                    rounded-xl
                    shadow-xl
                    flex
                    flex-col
                    max-h-[90vh]
                `}
            >
                {/* Header */}
                <div className="border-b px-6 py-4 overflow-hidden">
                    <h2 className="text-lg font-semibold">
                        {title}
                    </h2>
                </div>

                {/* Body */}
              
                    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                        {children}
                    </div>

                   
            </div>
        </Modal>
    );
}