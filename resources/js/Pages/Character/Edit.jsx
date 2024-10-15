import BaseLayout from "@/Layouts/BaseLayout";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { useForm } from "react-hook-form";

import { Button } from "@/Components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";

import { Switch } from "@/Components/ui/switch";
import NumberInput from "@/Components/NumberInput";
import { Link, router, usePage } from "@inertiajs/react";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const Edit = ({ character, auth }) => {
    const { errors } = usePage().props;
    const form = useForm({
        defaultValues: {
            name: character.name,
            is_enemy: character.is_enemy,
            defence: character.defence,
            strength: character.strength,
            accuracy: character.accuracy,
            magic: character.magic,
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        router.patch(`/characters/${character.id}`, data);
    };

    return (
        <BaseLayout user={auth?.user}>
            <Card>
                <CardHeader>
                    <div className="flex justify-between">
                        <CardTitle>Edit your character!</CardTitle>
                        <Button variant="destructive">
                            <Link
                                href={route("characters.destroy", character.id)}
                                method="delete"
                            >
                                Delete character
                            </Link>
                        </Button>
                    </div>
                    <CardDescription>
                        Edit your very unique and smart character to compete
                        with others in forms of contests!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Character name</FormLabel>
                                        <FormControl>
                                            <Input
                                                required
                                                placeholder="Mjölnir"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Your new character's name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {auth.user.is_admin == 1 && (
                                <FormField
                                    control={form.control}
                                    name="is_enemy"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Enemy</FormLabel>
                                                <FormDescription>
                                                    Select if this character is
                                                    an enemy, enemies are non
                                                    playable characters.
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    aria-readonly
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            )}
                            <div className="grid grid-cols-4 gap-4 -mb-10">
                                <NumberInput
                                    form={form}
                                    labelText="Defence"
                                    name="defence"
                                    max={3}
                                />
                                <NumberInput
                                    form={form}
                                    labelText="Strength"
                                    name="strength"
                                />
                                <NumberInput
                                    form={form}
                                    labelText="Accuracy"
                                    name="accuracy"
                                />
                                <NumberInput
                                    form={form}
                                    labelText="Magic"
                                    name="magic"
                                />
                                <FormDescription className="col-span-5">
                                    Your new character's stats, the sum of the
                                    stats cannot exceed 20.
                                </FormDescription>
                                {errors.stats && (
                                    <FormDescription className="text-red-500 text-md flex justify-center col-span-5">
                                        <Alert variant="destructive">
                                            <ExclamationTriangleIcon className="h-4 w-4" />
                                            <AlertTitle>
                                                Could not create the character
                                            </AlertTitle>
                                            <AlertDescription>
                                                {errors.stats}
                                            </AlertDescription>
                                        </Alert>
                                    </FormDescription>
                                )}
                            </div>
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </BaseLayout>
    );
};

export default Edit;
