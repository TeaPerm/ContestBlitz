import { Link } from "@inertiajs/react";
import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import { Home, Map, Swords, Users } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

const Menubar = ({ user }) => {
    const pathname = window.location.pathname;

    return (
        <div>
            <aside className="fixed inset-y-0 left-0 z-10 flex w-14 flex-col border-r bg-background ">
                <nav className="h-full flex flex-col items-center gap-4 px-2 sm:py-4">
                    <Link
                        href="/"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <Home className="h-5 w-5 transition-all group-hover:scale-110" />
                    </Link>

                    {user && (
                        <TooltipProvider delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={route("characters.index")}
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                            pathname.includes("characters")
                                                ? "bg-muted text-accent-foreground"
                                                : "text-muted-foreground"
                                        }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                                    >
                                        <Users className="h-5 w-5" />
                                        <span className="sr-only">
                                            Characters
                                        </span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    Characters
                                </TooltipContent>
                            </Tooltip>
                            {user.is_admin == 1 && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={route("places.index")}
                                            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                                pathname.includes("places")
                                                    ? "bg-muted text-accent-foreground"
                                                    : "text-muted-foreground"
                                            }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                                        >
                                            <Map className="h-5 w-5" />
                                            <span className="sr-only">
                                                Places
                                            </span>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        Places
                                    </TooltipContent>
                                </Tooltip>
                            )}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={route("contests.create")}
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                            pathname.includes("contests")
                                                ? "bg-muted text-accent-foreground"
                                                : "text-muted-foreground"
                                        }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                                    >
                                        <Swords className="h-5 w-5" />
                                        <span className="sr-only">
                                            Contests
                                        </span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    Contests
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                    <div className="mt-auto">
                        <ModeToggle />
                    </div>
                </nav>
            </aside>
        </div>
    );
};

export default Menubar;
