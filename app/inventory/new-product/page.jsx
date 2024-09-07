// app/inventory/new-product/page.js
"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/Forms/ProductForm";

const NewProductPage = () => {
  const router = useRouter();

  const handleFormClose = () => {
    router.push("/inventory");
  };

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-8">
      <ProductForm onFormClose={handleFormClose} isNewProduct={true} />
    </div>
  );
};

export default NewProductPage;
