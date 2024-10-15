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
import { router, usePage } from "@inertiajs/react";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const Create = ({ auth }) => {
    const { errors } = usePage().props;
    const form = useForm({
        defaultValues: {
            name:"",
            is_enemy: false,
            defence: 0,
            strength: 5,
            accuracy: 5,
            magic: 5,
            // user_id: auth.user.id,
        },
    });

    const onSubmit = (data) => {
        router.post("/characters", data);
    };

    return (
        <BaseLayout user={auth?.user}>
            <div className="flex justify-center">
                <Card>
                    <CardHeader>
                        <CardTitle>Create a new character!</CardTitle>
                        <CardDescription>
                            Create your very unique and smart character to
                            compete with others in forms of contests!
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
                                            <FormLabel>
                                                Character name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="w-64"
                                                    placeholder="Mjölnir"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                            {errors.name ? <FormMessage>{errors.name}</FormMessage> : "Your new character's name."}
                                            </FormDescription>
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
                                                        Select if this character
                                                        is an enemy, enemies are
                                                        non playable characters.
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
                                        Your new character's stats, the sum of
                                        the stats must be 20.
                                    </FormDescription>
                                    {errors.stats && (
                                        <FormDescription className="text-red-500 text-md flex justify-center col-span-5">
                                            <Alert variant="destructive">
                                                <ExclamationTriangleIcon className="h-4 w-4" />
                                                <AlertTitle>
                                                    Could not create the
                                                    character
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
            </div>
        </BaseLayout>
    );
};

export default Create;
