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

const Create = ({ auth }) => {
    const { errors } = usePage().props;
    console.log(errors);
    const form = useForm({
        defaultValues: {
            name: "Your place name comes here",
            description: "Bad weather all year around hard to fight at, rarely cloudy",
            image: "https://ui.shadcn.com/placeholder.svg",
        },
    });

    const onSubmit = (data) => {
        console.log(formData);
        console.log(data);
        router.post("/places", formData);
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
                <Card>
                    <CardHeader className="pb-4">
                        Create your place!
                        <CardDescription>
                            Create a very unique place for the characters to
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
                                            {errors.name ? <FormMessage>{errors.name}</FormMessage> : "Your new place's name."}
                                            </FormDescription>
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
                                            {errors.image ? <FormMessage>{errors.image}</FormMessage> : "Please provide a url for the image"}

                                            </FormDescription>

                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </CardContent>
                    {/* <CardFooter>footer</CardFooter> */}
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

export default Create;


