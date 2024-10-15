import PlaceCard from "@/Components/PlaceCard";
import BaseLayout from "@/Layouts/BaseLayout";
import { Link, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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

const Edit = ({ place, auth }) => {
    const { errors } = usePage().props;

    const form = useForm({
        defaultValues: {
            name: place.name,
            description: place.description,
            image: place.image,
        },
    });

    const onSubmit = () => {
        router.patch(`/places/${place.id}`, formData);
    };

    const [formData, setFormData] = useState({
        name: form.getValues("name"),
        description: form.getValues("description"),
        image: form.getValues("image"),
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <BaseLayout user={auth.user}>
            <div className="grid grid-cols-2 gap-4">
                <Card className="">
                    <CardHeader className="pb-4">
                        <div className="flex justify-between">
                            Edit your place!
                            <Button variant="destructive">
                                <Link
                                    href={route("places.destroy", place.id)}
                                    method="delete"
                                >
                                    Delete place
                                </Link>
                            </Button>
                        </div>
                        <CardDescription>
                            Edit your very unique place for the characters to
                            contest in!
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
                                            {errors.name ?? (
                                                <FormMessage></FormMessage>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    className=""
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Place description
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Very nice place"
                                                    {...field}
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Describe your place at your best
                                                effort.
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
                                                Plase give a url for an image of
                                                the place.
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
                </Card>
                        <PlaceCard
                            placeDescription={formData.description}
                            placeName={formData.name}
                            placeImage={formData.image}
                        />
            </div>
        </BaseLayout>
    );
};

export default Edit;
