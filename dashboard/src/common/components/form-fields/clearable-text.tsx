import {
    Button,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "@marzneshin/common/components";
import { useFormContext, useWatch } from "react-hook-form";
import { Trash, X } from "lucide-react";

export const ClearableTextField = ({
    name,
    label,
    placeholder = "",
}: {
    name: string;
    label: string;
    placeholder?: string;
}) => {
    const form = useFormContext();
    const value = useWatch({ name });

    const nullifyFieldValue = () => {
        form.setValue(name, null, {
            shouldDirty: true,
            shouldValidate: true,
        });
    };
    const clearFieldValue = () => {
        form.setValue(name, "", {
            shouldDirty: true,
            shouldValidate: true,
        });
    };

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <div className="relative w-full max-w-sm flex items-center gap-2">
                            <Input placeholder={placeholder} {...field} />
                            <Button
                                type="button"
                                aria-label="clear"
                                variant="ghost"
                                size="icon"
                                onClick={nullifyFieldValue}
                                disabled={value === ""}
                                className="absolute hover:fg-destructive-background right-1 top-1/2 -translate-y-1/2 h-7"
                            >
                                <X className="h-4 w-4 " />
                                <span className="sr-only">Clear</span>
                            </Button>
                            <Button
                                type="button"
                                aria-label="clear"
                                variant="ghost"
                                size="icon"
                                onClick={clearFieldValue}
                                disabled={value === ""}
                                className="absolute hover:fg-destructive right-7 top-1/2 -translate-y-1/2 h-7"
                            >
                                <Trash className="h-4 w-4 " />
                                <span className="sr-only">Clear</span>
                            </Button>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};