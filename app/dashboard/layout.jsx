// app/inventory/layout.js
import MainLayout from "@/layouts/MainLayout";

export default function DashboardLayout({ children }) {
  return (
    <MainLayout>
      <div className="w-full h-full overflow-auto main-container">
        {children}
      </div>
    </MainLayout>
  );
}
