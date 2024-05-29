import { createFileRoute } from "@tanstack/react-router";
import { UsersSettingsDialog, useUserQuery } from "@marzneshin/features/users";
import { AlertDialog, AlertDialogContent } from "@marzneshin/components";
import { useDialog } from "@marzneshin/hooks";

const UserSetting = () => {
    const [settingsDialogOpen, setSettingsDialogOpen] = useDialog(true);
    const { userId } = Route.useParams();
    const { data: user } = useUserQuery({ username: userId });

    return user ? (
        <UsersSettingsDialog
            open={settingsDialogOpen}
            onOpenChange={setSettingsDialogOpen}
            entity={user}
        />
    ) : (
        <AlertDialog>
            <AlertDialogContent>User not found</AlertDialogContent>
        </AlertDialog>
    );
};

export const Route = createFileRoute("/_dashboard/users/$userId/")({
    component: UserSetting,
});
