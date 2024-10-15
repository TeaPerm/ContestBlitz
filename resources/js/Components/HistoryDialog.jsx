import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { NotebookIcon } from "lucide-react";
import { HistoryChart } from "./HistoryChart";
import { Table } from "@tremor/react";
import {
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Badge } from "./ui/badge";
import WinnerBadge from "./WinnerBadge";

export function HistoryDialog({ history, winner }) {

    let roundNumber = 1;
    let heroTotalDamage = 0;
    let enemyTotalDamage = 0;

    history.forEach((attack) => {
        attack.damage = parseFloat(attack.damage);
        if (attack.attacker === "hero") {
            heroTotalDamage += attack.damage;
        } else if (attack.attacker === "enemy") {
            enemyTotalDamage += attack.damage;
        }
    });

    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button variant="outline">
                    <NotebookIcon />
                    History
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] lg:max-w-screen-sm overflow-y-scroll max-h-screen">
                <DialogHeader>
                    <DialogTitle>History</DialogTitle>
                    <DialogDescription>
                        History of the contest.
                    </DialogDescription>
                </DialogHeader>
                <Table className="overflow-y-visible ">
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Round</TableHead>
                            <TableHead>Attacker</TableHead>
                            <TableHead>Attack type</TableHead>
                            <TableHead className="text-right">Damage</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {history.map((round, index) => (
                            <TableRow key={index}>
                                {index % 2 === 0 && (
                                    <TableCell className="" rowSpan="2">
                                        Round {roundNumber++}
                                    </TableCell>
                                )}
                                <TableCell className="">
                                    <Badge
                                        className="text-l"
                                        variant={(() => {
                                            switch (round.attacker) {
                                                case "enemy":
                                                    return "destructive";
                                                case "hero":
                                                    return "green";
                                            }
                                        })()}
                                    >
                                        {(() => {
                                            switch (round.attacker) {
                                                case "enemy":
                                                    return "Enemy";
                                                case "hero":
                                                    return "Hero";
                                            }
                                        })()}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                    {capitalizeFirstLetter(round.attackType)}
                                </TableCell>
                                <TableCell className="text-right">
                                    {round.damage}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow className="mb-0">
                            <TableCell colSpan={2} className="text-center">
                                Hero damage: {heroTotalDamage.toFixed(1)}
                            </TableCell>
                            <TableCell colSpan={2}>Enemy damage: {enemyTotalDamage.toFixed(1)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell />
                            <TableCell>Winner:</TableCell>
                            <TableCell colSpan="2">
                            <WinnerBadge winner={winner}/>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </DialogContent>
        </Dialog>
    );
}
