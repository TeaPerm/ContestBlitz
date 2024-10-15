import { Link } from "@inertiajs/react";
import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./ui/breadcrumb";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { PersonIcon } from "@radix-ui/react-icons";
import {
    capitalizeFirstLetter,
    generatePathUntilIndex,
    sliceUrl,
} from "@/lib/utils";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./mode-toggle";

const Header = ({ user }) => {
    const breadCrumbs = sliceUrl(window.location.pathname);
    return (
        <header className="sticky top-0 z-30 flex justify-between h-14 items-center gap-4 border-b bg-background sm:static  sm:border-0 sm:bg-transparent ">
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            {breadCrumbs.length == 0 ? (
                                <BreadcrumbPage href="/">Home</BreadcrumbPage>
                            ) : (
                                <Link href="/">Home
                                </Link>
                            )}
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    {breadCrumbs.map((path, index) => (
                        <React.Fragment key={path}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {index == breadCrumbs.length - 1 ? (
                                    <BreadcrumbPage>
                                        {capitalizeFirstLetter(path)}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link
                                            href={generatePathUntilIndex(
                                                breadCrumbs,
                                                index + 1
                                            )}
                                        >
                                            {capitalizeFirstLetter(path)}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    ))}
                    <Separator/>
                </BreadcrumbList>
            </Breadcrumb>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full"
                    >
                        <PersonIcon className="w-5 h-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {user ? (
                        <>
                            <DropdownMenuLabel>{user.name} {user.is_admin == 1 &&
                            <span className="text-red-500">

                            ADMIN
                            </span>}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem asChild>
                                <Link
                                    href={route("profile.edit")}
                                    as="button"
                                    className="w-full cursor-pointer"
                                >
                                    Profile Settings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                    className="w-full cursor-pointer"
                                >
                                    Log Out
                                </Link>
                            </DropdownMenuItem>
                        </>
                    ) : (
                        <>
                            <DropdownMenuItem
                                asChild
                                className="cursor-pointer"
                            >
                                <a href={route("login")}>Log in</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                asChild
                                className="cursor-pointer"
                            >
                                <a href={route('register')}>Register</a>
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};

export default Header;
