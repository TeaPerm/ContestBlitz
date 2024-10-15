import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

const NumberInput = ({ name, form, labelText, className = "1/2" , max=20, }) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{labelText}</FormLabel>
                    <FormControl>
                        <Input
                            type="number"
                            min={0}
                            max={max}
                            required
                            {...field}
                            className={className}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default NumberInput;
