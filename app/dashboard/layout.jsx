// app/dashboard/layout.js
import MainLayout from "@/layouts/MainLayout";

export default function DashboardLayout({ children }) {
  return (
    <MainLayout>
      <div className="h-full overflow-hidden">{children}</div>
    </MainLayout>
  );
}
