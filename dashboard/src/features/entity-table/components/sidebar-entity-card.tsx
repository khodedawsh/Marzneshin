import {
    Card,
    CardContent,
} from "@marzneshin/components";
import {
    cn
} from "@marzneshin/utils";
import { type FC } from 'react'

interface SidebarEntityCardSectionProps<T> {
    entity: T;
}

export interface SidebarEntityCardSectionsProps<T> {
    header: FC<SidebarEntityCardSectionProps<T>>;
    content: FC<SidebarEntityCardSectionProps<T>>;
}

export const SidebarEntityCard: FC<SidebarEntityCardSectionProps<any> & SidebarEntityCardSectionsProps<any> & { checked: boolean }> = ({
    header: Header, content: Content, entity, checked = false
}) => {
    return (
        <Card className="w-full h-30 m-[2px]">
            <CardContent className={cn("p-2 flex-col flex gap-2 justify-start", checked && "dark:bg-primary-foreground bg-secondary")}>
                <Header entity={entity} />
                <Content entity={entity} />
            </CardContent>
        </Card>
    )
}
