import ActionDropdownMenu from "@/Components/ActionDropdownMenu";
import CreateButton from "@/Components/CreateButton";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Progress } from "@/Components/ui/progress";
import { Separator } from "@/Components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import BaseLayout from "@/Layouts/BaseLayout";
import { Link, router, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Index() {
    const { flash, characters, auth } = usePage().props;

    const canModify = (character) => {
        return auth.user.is_admin == 1 || character.user_id == auth.user.id;
    };

    useEffect(() => {
        switch (flash.message) {
            case "characters.store":
                toast.success("Character created!");
                break;
            case "characters.destroy":
                toast.error("Character deleted!");
                break;
            case "characters.update":
                toast.info("Character edited!");
                break;
        }
    }, [flash]);

    return (
        <BaseLayout user={auth?.user}>
            <h1 className="mb-2">Here you can see a list of characters.</h1>
            <Card>
                <CardHeader className="px-7">
                    <div className="flex justify-between">
                        <CardTitle>Characters</CardTitle>
                        <CreateButton
                            createNew="characters"
                            buttonTitle="Create new character"
                        />
                    </div>
                    <CardDescription>
                        List of characters and their stats.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Defence
                                </TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Strength
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Accuracy
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Magic
                                </TableHead>
                                <TableHead className="hidden md:table-cell text-right">
                                    Hero/Enemy
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {characters.map((character) => (
                                <TableRow className="" key={character.id}>
                                    <TableCell>
                                        <div className="font-medium">
                                            {character.name}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <div className="flex items-center gap-2">
                                            {character.defence}
                                            <Progress
                                                value={
                                                    (character.defence / 3) *
                                                    100
                                                }
                                                className="w-2/3"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <div className="flex items-center gap-2">
                                            {character.strength}
                                            <Progress
                                                value={
                                                    (character.strength / 20) *
                                                    100
                                                }
                                                className="w-2/3"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="flex items-center gap-2">
                                            {character.accuracy}
                                            <Progress
                                                value={
                                                    (character.accuracy / 20) *
                                                    100
                                                }
                                                className="w-2/3"
                                            />
                                        </div>{" "}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="flex items-center gap-2">
                                            {character.magic}
                                            <Progress
                                                value={
                                                    (character.magic / 20) * 100
                                                }
                                                className="w-2/3 "
                                            />
                                        </div>{" "}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-right">
                                        <Badge
                                            className="w-fit"
                                            variant={
                                                character.is_enemy
                                                    ? "destructive"
                                                    : "green"
                                            }
                                        >
                                            {character.is_enemy == 0
                                                ? "Hero"
                                                : "Enemy"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {canModify(character) && (
                                            <ActionDropdownMenu
                                                actionOn="characters"
                                                canView={
                                                    auth.user.id ==
                                                    character.user_id
                                                }
                                                canDelete={canModify(character)}
                                                id={character.id}
                                                canEdit={canModify(character)}
                                            />
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <Separator />
                <CardFooter>
                    <div className="text-xs text-muted-foreground mt-2">
                        <strong>{characters.length}</strong> characters have
                        been created so far.
                    </div>
                </CardFooter>
            </Card>
        </BaseLayout>
    );
}
