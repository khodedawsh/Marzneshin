import type { FC } from "react";
import { fetchAdmins, AdminType, AdminsQueryFetchKey } from "@marzneshin/features/admins";
import { columns as columnsFn } from "./columns";
import { EntityTable } from "@marzneshin/features/entity-table";
import { useNavigate } from "@tanstack/react-router";

export const AdminsTable: FC = () => {
    const navigate = useNavigate({ from: "/admins" });
    const onOpen = (entity: AdminType) => {
        navigate({
            to: "/admins/$adminId",
            params: { adminId: entity.username },
        })
    }

    const onEdit = (entity: AdminType) => {
        navigate({
            to: "/admins/$adminId/edit",
            params: { adminId: entity.username },
        })
    }

    const onDelete = (entity: AdminType) => {
        navigate({
            to: "/admins/$adminId/delete",
            params: { adminId: entity.username },
        })
    }

    const columns = columnsFn({ onEdit, onDelete, onOpen });

    return (
        <EntityTable
            fetchEntity={fetchAdmins}
            manualSorting={false}
            columns={columns}
            primaryFilter="username"
            entityKey={AdminsQueryFetchKey}
            onCreate={() => navigate({ to: "/admins/create" })}
            onOpen={onOpen}
        />
    );
};
