import { type FC, useEffect, useCallback } from "react";
import {
    Separator,
    DialogTitle,
    DialogContent,
    Dialog,
    DialogHeader,
    Form,
    Button,
    ScrollArea,
    VStack,
} from "@marzneshin/components";
import { useTranslation } from "react-i18next";
import { UsernameField, type UserMutationType } from "@marzneshin/features/users";
import {
    DATA_LIMIT_METRIC,
    useUsersCreationMutation,
    useUsersUpdateMutation,
    UserSchema,
} from "@marzneshin/features/users";
import { ServicesField } from "@marzneshin/features/services";
import { NoteField } from "./fields";
import { useMutationDialog } from "@marzneshin/hooks";
import { DataLimitFields, ExpirationMethodFields } from "./sections";

interface UsersMutationDialogProps {
    entity: UserMutationType | null;
    open: boolean;
    onOpenChange: (state: boolean) => void;
    onClose: () => void;
}

export const UsersMutationDialog: FC<UsersMutationDialogProps> = ({
    entity,
    open,
    onOpenChange,
    onClose,
}) => {
    const { t } = useTranslation();
    const getDefaultValues = useCallback(
        (): UserMutationType => ({
            service_ids: [],
            expire_strategy: "fixed_date",
            username: "",
            data_limit_reset_strategy: "no_reset",
            note: "",
        }),
        [],
    );

    const { form, handleSubmit } = useMutationDialog({
        entity,
        onOpenChange,
        createMutation: useUsersCreationMutation(),
        updateMutation: useUsersUpdateMutation(),
        schema: UserSchema,
        getDefaultValue: getDefaultValues,
        loadFormtter: (d) => ({
            ...d,
            data_limit: (d.data_limit ? d.data_limit : 0) / DATA_LIMIT_METRIC,
        }),
    });

    useEffect(() => {
        if (!open) onClose();
    }, [open, onClose]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange} defaultOpen={true}>
            <DialogContent className="min-w-full h-full md:h-auto md:min-w-[42rem]">
                <ScrollArea className="flex flex-col justify-between h-full ">
                    <DialogHeader className="mb-3">
                        <DialogTitle className="text-primary">
                            {entity
                                ? t("page.users.dialogs.edition.title")
                                : t("page.users.dialogs.creation.title")}
                        </DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={handleSubmit} >
                            <div className="flex-col grid-cols-2 gap-2 sm:flex md:grid h-full">
                                <div className="space-y-3">
                                    <UsernameField disabled={!!entity?.username} />
                                    <Separator />
                                    <DataLimitFields />
                                    <Separator />
                                    <ExpirationMethodFields entity={entity} />
                                    <Separator />
                                    <NoteField />
                                </div>
                                <VStack>
                                    <ServicesField />
                                </VStack>
                            </div>
                            <Button
                                className="mt-3 w-full font-semibold"
                                type="submit"
                                disabled={form.formState.isSubmitting}
                            >
                                {t("submit")}
                            </Button>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
