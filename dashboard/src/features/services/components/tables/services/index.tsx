import type { FC } from "react";
import {
  ServicesQueryFetchKey,
  fetchServices,
  ServiceType
} from "@marzneshin/features/services";
import { columns as columnsFn } from "./columns";
import { EntityTable } from "@marzneshin/features/entity-table";
import { useNavigate } from "@tanstack/react-router";

export const ServicesTable: FC = () => {
  const navigate = useNavigate({ from: "/services" });
  const onEdit = (entity: ServiceType) => {
    navigate({
      to: "/services/$serviceId/edit",
      params: { serviceId: String(entity.id) },
    })
  }

  const onDelete = (entity: ServiceType) => {
    navigate({
      to: "/services/$serviceId/delete",
      params: { serviceId: String(entity.id) },
    })
  }

  const onOpen = (entity: ServiceType) => {
    navigate({
      to: "/services/$serviceId",
      params: { serviceId: String(entity.id) },
    })
  }

  const columns = columnsFn({ onEdit, onDelete, onOpen });

  return (
    <EntityTable
      fetchEntity={fetchServices}
      columnsFn={columns}
      filteredColumn="name"
      entityKey={ServicesQueryFetchKey}
      onCreate={() => navigate({ to: "/services/create" })}
      onOpen={onOpen}
    />
  );
};
