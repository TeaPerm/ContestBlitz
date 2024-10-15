import Header from "@/Components/Header";
import Menubar from "@/Components/Menubar";
import { ThemeProvider } from "@/Components/theme-provider";
import { Toaster } from "@/Components/ui/sonner";
import { Head } from "@inertiajs/react";
import React from "react";

const BaseLayout = ({ children, user }) => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <main className="pb-12">
            <Head title="ContestBlitz">
                <link
                    rel="icon"
                    type="image/svg+xml"
                    svg="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNyb3duIj48cGF0aCBkPSJNMTEuNTYyIDMuMjY2YS41LjUgMCAwIDEgLjg3NiAwTDE1LjM5IDguODdhMSAxIDAgMCAwIDEuNTE2LjI5NEwyMS4xODMgNS41YS41LjUgMCAwIDEgLjc5OC41MTlsLTIuODM0IDEwLjI0NmExIDEgMCAwIDEtLjk1Ni43MzRINS44MWExIDEgMCAwIDEtLjk1Ny0uNzM0TDIuMDIgNi4wMmEuNS41IDAgMCAxIC43OTgtLjUxOWw0LjI3NiAzLjY2NGExIDEgMCAwIDAgMS41MTYtLjI5NHoiLz48cGF0aCBkPSJNNSAyMWgxNCIvPjwvc3ZnPg=="
                />
            </Head>
            <Menubar user={user} />
            <div className="ml-24 mr-12 mt-3">
                <Header user={user} />
                <div className="mt-4">{children}</div>
            </div>
            <Toaster closeButton richColors />
        </main>
      </ThemeProvider>
    );
};

export default BaseLayout;
