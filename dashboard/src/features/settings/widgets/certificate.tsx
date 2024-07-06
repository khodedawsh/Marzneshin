import {
    MiniWidget
} from "@marzneshin/components";
import {
    CertificateButton
} from "@marzneshin/features/settings";
import { useTranslation } from "react-i18next";

export const CertificateWidget = () => {
    const { t } = useTranslation()
    return (
        <MiniWidget
            title={t("certificate")}
        >
            <CertificateButton />
        </MiniWidget>
    )
}
