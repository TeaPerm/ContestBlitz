import { MoreHorizontal } from "lucide-react";

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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import { formatDate } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { HistoryDialog } from "./HistoryDialog";
import { Link } from "@inertiajs/react";
import WinnerBadge from "./WinnerBadge";

export default function ContestTable({ contests, character }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Contests</CardTitle>
                <CardDescription>
                    View your character's contests, with the results.
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                                <span className="text-center">Location</span>
                            </TableHead>
                            <TableHead>Enemy Name</TableHead>
                            <TableHead>Winner</TableHead>
                            <TableHead className="hidden md:table-cell text-center">
                                Created at
                            </TableHead>
                            <TableHead className="hidden md:table-cell text-center">
                                History
                            </TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contests.map((contest) => (
                            <TableRow key={contest.contest_id}>
                                <TableCell className="hidden sm:table-cell">
                                    <TooltipProvider delayDuration={0}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <img
                                                    alt="Product img"
                                                    className="aspect-square rounded-md object-cover"
                                                    height="64"
                                                    src={contest.place_image}
                                                    width="64"
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent side="top">
                                                {contest.place_name}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </TableCell>
                                <TableCell className="font-medium">
                                    {contest.enemy_name}
                                </TableCell>
                                <TableCell>
                                    <WinnerBadge winner={contest.win}/>
                                </TableCell>
                                <TableCell className="text-center">
                                    {formatDate(contest.contest_date)}
                                </TableCell>
                                <TableCell className="text-center">
                                    <HistoryDialog
                                        history={JSON.parse(contest.history)}
                                        winner={contest.win}
                                    />
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                aria-haspopup="true"
                                                size="icon"
                                                variant="ghost"
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Toggle menu
                                                </span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>
                                                Actions
                                            </DropdownMenuLabel>
                                            <DropdownMenuItem
                                                asChild
                                                className="cursor-pointer"
                                            >
                                                <Link
                                                    href={route("contests.show",contest.contest_id)}
                                                >
                                                    View contest
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <Separator />
            <CardFooter>
                <div className="text-xs text-muted-foreground pt-2 ">
                    {character.name} has fought{" "}
                    <strong>{contests.length}</strong> contest(s).
                </div>
            </CardFooter>
        </Card>
    );
}
