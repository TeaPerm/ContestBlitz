import InputPlaceCard from "@/Components/InputPlaceCard";
import PlaceCard from "@/Components/PlaceCard";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/Components/ui/card";
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
import BaseLayout from "@/Layouts/BaseLayout";
import { router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const InputPlaceCard = () => {
    return (
        <Card>
            <CardHeader className="pb-4">
                Create your place!
                <CardDescription>
                    Create a very unique place for the characters to contest in!
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
                                    <FormLabel>Place name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Region Fjolkjard"
                                            {...field}
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Your new place's name.
                                    </FormDescription>
                                    {errors.name ?? <FormMessage />}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            className=""
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Place description</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Very nice place"
                                            {...field}
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Describe your place at your best effort.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Place image</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="example.com/image.jpg"
                                            {...field}
                                            value={formData.image}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Plase give a url for an image of the
                                        place.
                                    </FormDescription>
                                    {errors.image ?? (
                                        <FormMessage></FormMessage>
                                    )}
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
            {/* <CardFooter>footer</CardFooter> */}
        </Card>
    );
};

export default InputPlaceCard;
