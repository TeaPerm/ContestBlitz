import React from "react";
import { Button } from "./ui/button";
import { Link } from "@inertiajs/react";

const AttackButton = ({
    win,
    attackType,
    color,
    icon,
    contestId,
    disabled,
    setDisabled,
}) => {
    return (
        <Button asChild>
            <Link
                disabled={disabled}
                onClick={() => setDisabled(!disabled)}
                id={attackType}
                as="button"
                className={`font-black text-xl ${color} hover:${color}/80`}
                href={route("contests.update", [contestId, attackType])}
                method="patch"
            >
                {icon}
                {attackType.toUpperCase()}
            </Link>
        </Button>
    );
};

export default AttackButton;

{
    /* <Button asChild>
<Link
    disabled={contest.win}
    as="button"
    className="bg-yellow-700 hover:bg-yellow-700/80"
    href={route("contests.update", [contest.id, "ranged"])}
    method="patch"
>
    <Crosshair />
    RANGED
</Link>
</Button> */
}
