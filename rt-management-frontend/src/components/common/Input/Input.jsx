import { forwardRef } from "react";

const Input = forwardRef(function Input(
    { label, error, className = "", ...props },
    ref
) {
    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <input
                ref={ref}
                {...props}
                className={`w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error ? "border-red-500" : ""
                } ${className}`}
            />

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        </div>
    );
});

export default Input;