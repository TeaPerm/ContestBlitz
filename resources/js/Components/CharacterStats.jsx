import { AngryIcon, Copy, CreditCard, MoreVertical, Truck } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Separator } from "@/Components/ui/separator";
import React from "react";
import { formatDate } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import ActionDropdownMenu from "./ActionDropdownMenu";

export default function CharacterStats({ character, enableView }) {
    return (
        <Card className="overflow-hidden h-fit">
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        {character.name}
                    </CardTitle>
                    <Badge
                        className="w-fit"
                        variant={character.is_enemy ? "destructive" : "green"}
                    >
                        {character.is_enemy == 0 ? "Hero" : "Enemy"}
                    </Badge>
                    <CardDescription>
                        Created: {formatDate(character.created_at)}
                    </CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                            >
                                <MoreVertical className="h-3.5 w-3.5" />
                                <span className="sr-only">More</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {enableView && (
                                <DropdownMenuItem
                                    asChild
                                    className="cursor-pointer"
                                >
                                    <Link
                                        className="cursor-pointer"
                                        href={route(
                                            "characters.show",
                                            character.id
                                        )}
                                    >
                                        View
                                    </Link>
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                asChild
                                className="cursor-pointer"
                            >
                                <Link
                                    className="cursor-pointer"
                                    href={route(
                                        "characters.edit",
                                        character.id
                                    )}
                                >
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                asChild
                                className="cursor-pointer text-red-500"
                            >
                                <Link
                                    href={route(
                                        "characters.destroy",
                                        character.id
                                    )}
                                    method="delete"
                                >
                                    Delete character
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> */}
                    <ActionDropdownMenu actionOn="characters" canView={enableView} canEdit canDelete id={character.id}/>
                </div>
            </CardHeader>
            <Separator className="" />
            <CardContent className="px-6 pb-6 pt-4 text-sm">
                <div className="grid gap-3">
                    <div className="font-semibold underline">Character stats</div>
                    <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                Defence{" "}
                                <span className="font-bold">
                                    ({character.defence})
                                </span>
                            </span>

                            <Progress
                                value={(character.defence / 3) * 100}
                                className="w-1/2"
                            />
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                Strength{" "}
                                <span className="font-bold">
                                    ({character.strength})
                                </span>
                            </span>

                            <Progress
                                value={(character.strength / 20) * 100}
                                className="w-1/2"
                            />
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                Accuracy{" "}
                                <span className="font-bold">
                                    ({character.accuracy})
                                </span>
                            </span>

                            <Progress
                                value={(character.accuracy / 20) * 100}
                                className="w-1/2"
                            />
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                Magic{" "}
                                <span className="font-bold">
                                    ({character.magic})
                                </span>
                            </span>

                            <Progress
                                value={(character.magic / 20) * 100}
                                className="w-1/2"
                            />
                        </li>
                    </ul>
                    {character.is_enemy == 0 && (
                        <>
                            <Separator className="my-2" />
                            <div className="flex items-center justify-center">
                                <Link
                                    href={route("contests.store", character)}
                                    method="post"
                                >
                                    <Button className="px-16">CONTEST</Button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
