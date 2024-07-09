import { type FC } from "react";
import { BooleanPill } from "@marzneshin/components";
import { useTranslation } from "react-i18next";
import { AdminProp } from "@marzneshin/features/admins";

export const AdminPermissionPill: FC<AdminProp> = ({ admin }) => {
    const { t } = useTranslation();
    return (
        <BooleanPill
            active={admin.is_sudo}
            activeLabel={t('sudo')}
            activeVariant="royal"
            inactiveLabel={t('normal')}
            inactiveVariant="warning"
        />
    )
}
