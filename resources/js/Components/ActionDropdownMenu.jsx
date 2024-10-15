import { Badge } from "@/Components/ui/badge";
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
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Progress } from "@/Components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import BaseLayout from "@/Layouts/BaseLayout";
import { Link, router } from "@inertiajs/react";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import React from "react";

const ActionDropdownMenu = ({ actionOn, canView, canEdit, canDelete, id }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                    {canView && (
                        <Link
                            className="cursor-pointer"
                            href={route(`${actionOn}.show`, id)}
                        >
                            View
                        </Link>
                    )}
                </DropdownMenuItem>
                {canEdit && (
                    <DropdownMenuItem asChild>
                        <Link
                            className="cursor-pointer"
                            href={route(`${actionOn}.edit`, id)}
                        >
                            Edit
                        </Link>
                    </DropdownMenuItem>
                )}
                {canDelete && (
                    <DropdownMenuItem asChild className="text-red-500">
                        <Link
                            className="cursor-pointer"
                            aria-label="delete character"
                            href={route(`${actionOn}.destroy`, id)}
                            method="delete"
                        >
                            Delete
                        </Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionDropdownMenu;
