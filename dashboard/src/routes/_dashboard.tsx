import {
  Drawer,
  DrawerContent,
  Header,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Toaster,
  Loading
} from "@marzneshin/components";
import { useAuth } from "@marzneshin/features/auth";
import { DashboardSidebar, ToggleButton } from "@marzneshin/features/sidebar";
import { usePanelToggle } from "@marzneshin/features/sidebar/use-panel-toggle";
import { useScreenBreakpoint } from "@marzneshin/hooks/use-screen-breakpoint";
import { cn } from "@marzneshin/utils";
import { Suspense } from "react";
import {
  Outlet,
  createFileRoute,
  redirect
} from "@tanstack/react-router";

export const DashboardLayout = () => {
  const isDesktop = useScreenBreakpoint("md");
  const {
    collapsed,
    panelRef,
    open,
    setCollapsed,
    setOpen,
    toggleCollapse,
    toggleOpen,
  } = usePanelToggle(isDesktop);

  return (
    <div className="flex flex-col w-screen h-screen">
      <header className="h-[3.5rem]">
        <Header>
          <ToggleButton
            isDesktop={isDesktop}
            collapsed={collapsed}
            open={open}
            onToggle={isDesktop ? toggleCollapse : toggleOpen}
          />
        </Header>
      </header>
      {isDesktop ? (
        <ResizablePanelGroup direction="horizontal" className="block sm:hidden">
          <ResizablePanel
            collapsible
            collapsedSize={2}
            onCollapse={() => setCollapsed(true)}
            onExpand={() => setCollapsed(false)}
            minSize={15}
            className={cn("w-[120px] min-w-[70px]")}
            defaultSize={20}
            ref={panelRef}
            maxSize={30}
          >
            <DashboardSidebar
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
          </ResizablePanel>
          <ResizableHandle withHandle className="w-[2px]" />
          <ResizablePanel>
            <main>
              <Suspense fallback={<Loading />}>
                <Outlet />
              </Suspense>
              <Toaster position="top-center" />
            </main>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <div>
          <aside>
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerContent>
                <DashboardSidebar
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  setOpen={setOpen}
                  open={open}
                />
              </DrawerContent>
            </Drawer>
          </aside>
          <main className="sm:block">
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
            <Toaster position="top-center" />
          </main>
        </div>
      )}
    </div>
  );
};

export const Route = createFileRoute("/_dashboard")({
  component: () => <DashboardLayout />,
  beforeLoad: async () => {
    const loggedIn = await useAuth.getState().isLoggedIn();
    if (!loggedIn) {
      throw redirect({
        to: "/login",
      });
    }
  },
});
