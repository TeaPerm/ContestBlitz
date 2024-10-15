import React from "react";
import { Badge } from "./ui/badge";

const WinnerBadge = ({winner}) => {
    return (
        <Badge
            className="text-l text-fit"
            variant={(() => {
                switch (winner) {
                    case 0:
                        return "destructive";
                    case 1:
                        return "green";
                    default:
                        return "secondary";
                }
            })()}
        >
            {(() => {
                switch (winner) {
                    case 0:
                        return "Enemy";
                    case 1:
                        return "Hero";
                    default:
                        return "To be determined";
                }
            })()}
        </Badge>
    );
};

export default WinnerBadge;
