"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import MainLayout from "@/layouts/MainLayout";
import ProductForm from "@/components/Forms/ProductForm";

const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();

  const handleFormClose = () => {
    router.push("/inventory");
  };

  return (
    <MainLayout>
      <ProductForm
        onFormClose={handleFormClose}
        isNewProduct={false}
        productId={params.id}
      />
    </MainLayout>
  );
};

export default EditProductPage;
