import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import BaseLayout from "@/Layouts/BaseLayout";
import { Label } from "@/Components/ui/label";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

export default function Login({ status, canResetPassword, auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <BaseLayout user={auth.user}>
            <Card className="mx-auto max-w-sm mt-8 px-8 py-4">
                <CardHeader className="px-0">
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full text-primary dark:bg-stone-950"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full dark:bg-stone-950"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="underline text-sm text-gray-600 hover:text-gray-600/80 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Forgot your password?
                            </Link>
                        )}

                        <PrimaryButton className="ms-4" disabled={processing}>
                            Log in
                        </PrimaryButton>
                    </div>
                    <div className="mt-4 text-center text-sm text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link href={route('register')} className="underline">
                            Sign up
                        </Link>
                    </div>
                </form>
            </Card>
        </BaseLayout>
    );
}
