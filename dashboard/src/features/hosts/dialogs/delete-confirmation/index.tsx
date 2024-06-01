import { DeleteConfirmation } from '@marzneshin/components'
import { type FC, useEffect } from 'react'
import { HostType, useHostsDeletionMutation } from '@marzneshin/features/hosts'

interface HostsDeleteConfirmationDialogProps {
    onOpenChange: (state: boolean) => void
    onClose: () => void
    open: boolean
    entity: HostType
}

export const HostsDeleteConfirmationDialog: FC<HostsDeleteConfirmationDialogProps> = ({ onOpenChange, open, entity, onClose }) => {
    const deleteMutation = useHostsDeletionMutation();

    useEffect(() => {
        if (!open) onClose();
    }, [open, onClose]);

    return (
        <DeleteConfirmation
            open={open}
            onOpenChange={onOpenChange}
            action={() => deleteMutation.mutate(entity)}
        />
    )
}
