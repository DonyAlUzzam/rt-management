import Button from "../Button";
import Input from "../Input";

export default function CrudToolbar({

    search,

    onSearch,

    addLabel,

    onAdd

}) {

    return (

        <div
            className="
                flex
                flex-col
                md:flex-row
                justify-between
                gap-4
                mb-6
            "
        >

            <div className="w-full md:w-80">

                <Input

                    placeholder="Search resident..."

                    value={search}

                    onChange={(e) =>

                        onSearch(e.target.value)

                    }

                />

            </div>

            <Button
                onClick={onAdd}
            >
                {addLabel}
            </Button>

        </div>

    );

}