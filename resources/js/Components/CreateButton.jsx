import React from "react";
import { Button } from "./ui/button";
import { Link } from "@inertiajs/react";
import { PlusCircle } from "lucide-react";

const CreateButton = ({createNew, buttonTitle}) => {
    return (
        <div>
            <Button size="sm" className="h-7 gap-1" variant="secondary" asChild>
                <Link href={route(`${createNew}.create`)}>
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        {buttonTitle}
                    </span>
                </Link>
            </Button>
        </div>
    );
};

export default CreateButton;
