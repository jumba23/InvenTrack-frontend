"use client";

import { useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout";
import ProductForm from "@/components/Forms/ProductForm";

const NewProductPage = () => {
  const router = useRouter();

  const handleFormClose = () => {
    router.push("/inventory");
  };

  return (
    <MainLayout>
      <ProductForm onFormClose={handleFormClose} isNewProduct={true} />
    </MainLayout>
  );
};

export default NewProductPage;
