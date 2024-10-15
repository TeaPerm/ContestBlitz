import { Button } from "@/Components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Link } from "@inertiajs/react";
import React from "react";

export default function InfoCard({ title, description, buttonTitle, user }) {
    return (
        <Card className="sm:col-span-2">
            <CardHeader className="pb-3">
                <CardTitle>{title}</CardTitle>
                <CardDescription className=" text-balance leading-relaxed">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                {user ? (
                    <Button asChild>
                        <Link
                            className="cursor-pointer"
                            href={route("characters.index")}
                        >
                            Begin!
                        </Link>
                    </Button>
                ) : (
                    <>
                        <Button className="mr-2" asChild>
                            <Link
                                className="cursor-pointer "
                                href={route("login")}
                            >
                                {buttonTitle}
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link
                                className="cursor-pointer"
                                href={route("register")}
                            >
                                Register
                            </Link>
                        </Button>
                    </>
                )}
            </CardFooter>
        </Card>
    );
}
