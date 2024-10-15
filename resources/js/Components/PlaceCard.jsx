import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import ActionDropdownMenu from "./ActionDropdownMenu";
import React from "react";

export default function PlaceCard({
    placeDescription,
    user,
    placeName,
    placeImage,
    enableDropdown,
    placeId,
}) {
    function is_admin(user) {
        return user.is_admin == 1;
    }


    return (
        <Card className="overflow-hidden flex flex-col justify-between">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    {placeName}
                    {enableDropdown && (
                        <ActionDropdownMenu
                            canDelete={is_admin}
                            canEdit={is_admin(user)}
                            actionOn="places"
                            id={placeId}
                        />
                    )}
                </CardTitle>

                <CardDescription>{placeDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-2">
                    <img
                        alt="Place image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src={placeImage}
                        width="300"
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src =
                                "https://ui.shadcn.com/placeholder.svg";
                        }}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
