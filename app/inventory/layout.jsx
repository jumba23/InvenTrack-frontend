// app/inventory/layout.js
import MainLayout from "@/layouts/MainLayout";

export default function InventoryLayout({ children }) {
  return (
    <MainLayout>
      <div className="h-full overflow-hidden">{children}</div>
    </MainLayout>
  );
}
