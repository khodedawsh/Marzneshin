import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AdminsMutationDialog } from "@marzneshin/features/admins";
import { useDialog } from "@marzneshin/hooks";

const AdminCreate = () => {
    const [mutationDialogOpen, setMutationDialogOpen] = useDialog(true);
    const navigate = useNavigate({ from: "/admins/create" });
    return (
        <AdminsMutationDialog
            open={mutationDialogOpen}
            onOpenChange={setMutationDialogOpen}
            onClose={() => navigate({ to: "/admins" })}
        />
    );
}

export const Route = createFileRoute("/_dashboard/admins/create")({
    component: AdminCreate,
});
