import {
    createFileRoute,
    useNavigate,
} from "@tanstack/react-router";
import {
    useRouterUserContext,
    UsersSettingsDialog,
} from "@marzneshin/features/users";
import { useDialog } from "@marzneshin/hooks";

const UserOpen = () => {
    const [settingsDialogOpen, setSettingsDialogOpen] = useDialog(true);
    const value = useRouterUserContext()
    const navigate = useNavigate({ from: "/users/$userId" });

    return value && (
        <UsersSettingsDialog
            open={settingsDialogOpen}
            onOpenChange={setSettingsDialogOpen}
            entity={value.user}
            onClose={() => navigate({ to: "/users" })}
        />
    );
}

export const Route = createFileRoute('/_dashboard/users/$userId/')({
    component: UserOpen
})
