import BaseLayout from "@/Layouts/BaseLayout";
import { Copy, CreditCard, MoreVertical, Truck } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import React from "react";
import { Progress } from "./ui/progress";

export default function ContestCharacterCard({
    character,
    hp,
    enemy,
    winner
}) {
    return (
        <div className="flex flex-col gap-4 mr-10">
            <Card
                className={`border border-4 ${
                    winner == 1 && !enemy ? "animate-bounce" :
                    winner == 0 && enemy ? "animate-bounce" : ""
                  } ${
                    enemy ? "border-red-500" : "border-green-500"
                } bg-[image:var(--image-url)] bg-cover h-32`}

                style={{
                    "--image-url": enemy ?"url(https://i.etsystatic.com/35087403/r/il/407fa4/4227264735/il_570xN.4227264735_mtch.jpg)" :`url(https://img.lovepik.com/free-png/20211216/lovepik-stick-figure-learning-png-image_401698687_wh1200.png)`,
                }}
            >
                <span className={`flex h-full flex-col items-center ${enemy? "text-red-500" : "text-green-500" } font-black hover:underline`}>
                    {character.name}
                </span>
            </Card>
            <div className="h-10 font-extrabold items-center flex justify-center">
                <Progress
                    value={(hp / 20) * 100}
                    className="h-8 bg-default border border-primary border-4"
                ></Progress>
                <span className="absolute font-black text-red-500">
                {hp}/20
                </span>
            </div>
            <Card className="">
                <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
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
                    </div>
                </CardContent>{" "}
            </Card>
        </div>
    );
}
