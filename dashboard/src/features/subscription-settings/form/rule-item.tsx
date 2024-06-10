import {
    Button,
    FormControl,
    FormField,
    FormItem,
    Input,
    SortableDragHandle,
    SortableItem,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@marzneshin/components";
import {
    Schema
} from "./schema"
import {
    useFormContext,
    FieldArrayWithId,
    UseFieldArrayRemove
} from "react-hook-form";
import { DragHandleDots2Icon, TrashIcon } from "@radix-ui/react-icons"

interface RuleItemProps {
    index: number;
    field: FieldArrayWithId<Schema, "rules">;
    onRemove: UseFieldArrayRemove;
}

export const RuleItem = ({ index, field, onRemove: remove }: RuleItemProps) => {
    const form = useFormContext();
    return (
        <SortableItem key={field.id} value={field.id} asChild>
            <div className="grid grid-cols-[2fr,1.3fr,0.25fr,0.25fr] items-center justify-start gap-2 my-2">
                <FormField
                    control={form.control}
                    name={`rules.${index}.pattern`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div>
                                    <Input className="h-8" {...field} />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`rules.${index}.result`}
                    render={({ field }) => (
                        <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <div>
                                        <SelectTrigger className="h-8 p-2">
                                            <SelectValue />
                                        </SelectTrigger>
                                    </div>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="xray">xray</SelectItem>
                                    <SelectItem value="v2ray">v2ray</SelectItem>
                                    <SelectItem value="sing-box">sing-box</SelectItem>
                                    <SelectItem value="clash">clash</SelectItem>
                                    <SelectItem value="clash-meta">clash-meta</SelectItem>
                                    <SelectItem value="block">block</SelectItem>
                                    <SelectItem value="template">template</SelectItem>
                                    <SelectItem value="base64-links">base64-links</SelectItem>
                                    <SelectItem value="links">links</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <SortableDragHandle
                    variant="outline"
                    size="icon"
                    className="size-8 shrink-0"
                >
                    <DragHandleDots2Icon
                        className="size-4"
                        aria-hidden="true"
                    />
                </SortableDragHandle>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-8 shrink-0"
                    onClick={() => remove(index)}
                >
                    <TrashIcon
                        className="size-4 text-destructive"
                        aria-hidden="true"
                    />
                    <span className="sr-only">Remove</span>
                </Button>
            </div>
        </SortableItem>
    )
}
