import {
    createFileRoute,
    defer,
    Await,
    Outlet,
} from "@tanstack/react-router";
import {
    RouterUserContext,
    fetchUser,
} from "@marzneshin/features/users";
import { Suspense } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    Loading
} from "@marzneshin/components";

const UserProvider = () => {
    const { user } = Route.useLoaderData()
    return (
        <Suspense fallback={<Loading />}>
            <Await promise={user}>
                {(user) => (
                    <RouterUserContext.Provider value={{ user }}>
                        <Suspense>
                            <Outlet />
                        </Suspense>
                    </RouterUserContext.Provider>
                )}
            </Await>
        </Suspense>
    )
}

export const Route = createFileRoute('/_dashboard/users/$userId')({
    loader: async ({ params }) => {
        const userPromise = fetchUser({
            queryKey: ["users", params.userId]
        });

        return {
            user: defer(userPromise)
        }
    },
    errorComponent: () => (
        <AlertDialog open={true}>
            <AlertDialogContent>User not found</AlertDialogContent>
        </AlertDialog>
    ),
    component: UserProvider,
})
