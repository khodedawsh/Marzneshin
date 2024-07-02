
import { DateField } from "@marzneshin/features/users";
import { FC } from "react";

export const ActivationDeadlineField: FC = () => {
    return <DateField name="activation_deadline" label="page.users.activation_deadline" />;
};
