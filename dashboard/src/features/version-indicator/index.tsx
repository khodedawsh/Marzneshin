import { Badge } from "@marzneshin/components";

export const VersionIndicator = () => {
    return (
        <div className="size-full flex justify-center items-center dark:text-neutral-300 text-neutral-800">
            <Badge>
                Marzneshin {import.meta.env.VITE_LATEST_APP_VERSION}
            </Badge>
        </div>
    )
}
