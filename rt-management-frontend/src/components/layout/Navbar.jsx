import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Navbar() {

    return (

        <header
            className="
                bg-white
                shadow
                h-16
                flex
                items-center
                justify-between
                px-8
            "
        >

            <h2
                className="
                    text-lg
                    font-semibold
                "
            >

                RT Management System

            </h2>

            <div
                className="
                    flex
                    items-center
                    gap-5
                "
            >

                <FaBell size={20} />

                <div
                    className="
                        flex
                        items-center
                        gap-2
                    "
                >

                    <FaUserCircle size={28} />

                    <span>Dony</span>

                </div>

            </div>

        </header>

    );

}