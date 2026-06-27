import { useEffect, useState } from "react";
import { UploadCloud, ImageIcon } from "lucide-react";

export default function FileUpload({

    label,

    accept = "image/*",

    value,

    onChange,

    error,

    existingImage = null,

    helperText = "PNG, JPG, JPEG"

}) {

    const [preview, setPreview] = useState(null);

    useEffect(() => {

        if (existingImage) {

            setPreview(existingImage);

        }

    }, [existingImage]);

    const handleChange = (e) => {

        const file = e.target.files?.[0];

        if (!file) return;

        setPreview(

            URL.createObjectURL(file)

        );

        onChange(file);

    };

    return (

        <div className="space-y-2">

            <label className="block text-sm font-medium">

                {label}

            </label>

            <label

                className="

                    flex

                    flex-col

                    items-center

                    justify-center

                    border-2

                    border-dashed

                    rounded-xl

                    h-44

                    cursor-pointer

                    transition

                    hover:border-blue-500

                    hover:bg-blue-50

                "

            >

                {

                    preview

                        ? (

                            <img

                                src={preview}

                                alt="Preview"

                                className="

                                    h-full

                                    w-full

                                    object-cover

                                    rounded-xl

                                "

                            />

                        )

                        : (

                            <>

                                <UploadCloud

                                    size={40}

                                    className="text-gray-400"

                                />

                                <p

                                    className="

                                        mt-2

                                        text-sm

                                        text-gray-600

                                    "

                                >

                                    Click to upload

                                </p>

                                <p

                                    className="

                                        text-xs

                                        text-gray-400

                                    "

                                >

                                    {helperText}

                                </p>

                            </>

                        )

                }

                <input

                    hidden

                    type="file"

                    accept={accept}

                    onChange={handleChange}

                />

            </label>

            {

                value && (

                    <div

                        className="

                            flex

                            items-center

                            gap-2

                            text-sm

                            text-gray-600

                        "

                    >

                        <ImageIcon size={16} />

                        {value.name}

                    </div>

                )

            }

            {

                error && (

                    <p

                        className="

                            text-sm

                            text-red-500

                        "

                    >

                        {error}

                    </p>

                )

            }

        </div>

    );

}