import { AppSidebar } from "@/shared/lib/shadcn-ui/components/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/lib/shadcn-ui/components/ui";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
