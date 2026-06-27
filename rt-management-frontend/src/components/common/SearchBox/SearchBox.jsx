import { FaSearch } from "react-icons/fa";

export default function SearchBox({

    value,

    onChange,

    placeholder = "Search...",

}) {

    return (

        <div className="relative">

            <FaSearch
                className="
                    absolute
                    left-3
                    top-3
                    text-gray-400
                "
            />

            <input

                value={value}

                onChange={onChange}

                placeholder={placeholder}

                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    py-2
                    pl-10
                    pr-3
                    focus:ring-2
                    focus:ring-blue-500
                "
            />

        </div>

    );

}