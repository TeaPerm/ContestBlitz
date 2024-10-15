import ContestCharacterCard from "@/Components/ContestCharacterCard";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import BaseLayout from "@/Layouts/BaseLayout";
import { Link } from "@inertiajs/react";
import { Crosshair, Slice, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import ReactConfetti from "react-confetti";
import { HistoryDialog } from "@/Components/HistoryDialog";
import AttackButton from "@/Components/AttackButton";

const Show = ({
    auth,
    contest,
    place,
    enemy,
    character,
    character_hp,
    enemy_hp,
}) => {
    const { width, height } = useWindowSize();

    const [disabled, setDisabled] = useState(contest.win != null);

    useEffect(() => {
        if (contest.win == null) {
            setDisabled(false);
        }
    }, [character_hp, enemy_hp]);

    return (
        <BaseLayout user={auth.user}>
            <div className="mb-2 h-2 font-extrabold text-l items-center flex justify-center">
                {place.name}
                &nbsp;&nbsp;
                {contest.win !== null ? (
                    <span
                        className={`flex justify-center ${
                            contest.win == 1 ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        Winner:{" "}
                        {contest.win === 1 ? character.name : enemy.name}
                    </span>
                ) : (
                    ""
                )}
            </div>
            <Card
                style={{ "--image-url": `url(${place.image})` }}
                className="bg-[image:var(--image-url)] bg-cover p-8  border border-4 border-muted"
            >
                <div className="grid grid-cols-3">
                    <ContestCharacterCard
                        character={character}
                        hp={character_hp}
                        winner={contest.win}
                    />
                    <div className="flex justify-center">
                        <HistoryDialog
                            history={contest.history}
                            winner={contest.win}
                        />
                    </div>
                    <ContestCharacterCard
                        character={enemy}
                        hp={enemy_hp}
                        winner={contest.win}
                        enemy
                    />
                </div>
            </Card>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {contest.win == null ? (
                    <>
                        <AttackButton
                            win={contest.win}
                            contestId={contest.id}
                            attackType="melee"
                            color="bg-red-700 hover:bg-red-700/80"
                            icon={<Slice />}
                            disabled={disabled}
                            setDisabled={setDisabled}
                        />
                        <AttackButton
                            win={contest.win}
                            contestId={contest.id}
                            attackType="ranged"
                            color="bg-yellow-700 hover:bg-yellow-700/80"
                            icon={<Crosshair />}
                            disabled={disabled}
                            setDisabled={setDisabled}
                        />
                        <AttackButton
                            win={contest.win}
                            contestId={contest.id}
                            attackType="magic"
                            color="bg-purple-700 hover:bg-purple-700/80"
                            icon={<Sparkles />}
                            disabled={disabled}
                            setDisabled={setDisabled}
                        />
                    </>
                ) : (
                    <ReactConfetti
                        width={width - 32}
                        height={height}
                        colors={contest.win == 1 ? ["#008000"] : ["#f44336"]}
                        numberOfPieces={600}
                        recycle={false}
                    />
                )}
            </div>
        </BaseLayout>
    );
};

export default Show;
