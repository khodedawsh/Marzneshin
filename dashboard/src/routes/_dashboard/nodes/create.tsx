import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MutationDialog } from "@marzneshin/features/nodes";
import { useDialog } from "@marzneshin/hooks";

const NodeCreate = () => {
    const [createDialogOpen, setCreateDialogOpen] = useDialog(true);
    const navigate = useNavigate({ from: "/nodes/create" });
    return (
        <MutationDialog
            open={createDialogOpen}
            onOpenChange={setCreateDialogOpen}
            entity={null}
            onClose={() => navigate({ to: "/nodes" })}
        />
    );
}

export const Route = createFileRoute("/_dashboard/nodes/create")({
    component: NodeCreate,
});
