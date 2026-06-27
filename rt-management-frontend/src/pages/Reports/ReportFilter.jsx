import {

    useMemo

} from "react";

import {

    Select,
    Input,
    Button

} from "@/components/common";

import MONTHS from "@/constants/months";

export default function ReportFilter({

    filter,

    onChange,

    onGenerate,

    loading

}) {

    const years = useMemo(() => {

        const currentYear =
            new Date().getFullYear();

        return Array.from(

            {

                length: 10

            },

            (_, index) => ({

                id:

                    currentYear - 5 + index,

                name:

                    currentYear - 5 + index

            })

        );

    }, []);

    return (

        <div

            className="

                mb-6

                grid

                gap-4

                md:grid-cols-4

            "

        >

            <Select

                label="Month"

                options={MONTHS}

                optionLabel="label"

                optionValue="value"

                value={filter.month}

                onChange={(e)=>

                    onChange({

                        ...filter,

                        month:Number(

                            e.target.value

                        )

                    })

                }

            />

            <Select

                label="Year"

                options={years}

                optionLabel="name"

                optionValue="id"

                value={filter.year}

                onChange={(e)=>

                    onChange({

                        ...filter,

                        year:Number(

                            e.target.value

                        )

                    })

                }

            />

            <div

                className="

                    flex

                    items-end

                "

            >

                <Button

                    loading={loading}

                    onClick={onGenerate}

                >

                    Generate Report

                </Button>

            </div>

        </div>

    );

}