import { SubscriptionSettingsType } from "@marzneshin/features/subscription-settings";
import { useQuery } from "@tanstack/react-query";
import { fetch } from "@marzneshin/utils";

export async function fetchSubscriptionSettings(): Promise<SubscriptionSettingsType> {
    return fetch(`/system/settings/subscription`);
}

export const subscriptionSettingsQueryKey = ["system", "settings", "subscription"]

export const useSubscriptionSettingsQuery = () => {
    return useQuery({
        queryKey: subscriptionSettingsQueryKey,
        queryFn: fetchSubscriptionSettings,
        initialData: {
            // url_prefix: "",
            template_on_acceptance: false,
            profile_title: "",
            support_link: "",
            update_interval: 0,
            rules: [],
        },
    });
};
