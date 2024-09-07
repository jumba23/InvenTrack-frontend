// EditProductPage.jsx
"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductForm from "@/components/Forms/ProductForm";
import { useProduct } from "@/context/ProductContext";

const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const { setRenderForm } = useProduct();
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    // Ensure renderForm is set to true when this page is mounted
    setRenderForm(true);

    // Cleanup function to set renderForm to false when component unmounts
    return () => setRenderForm(false);
  }, [setRenderForm]);

  const handleFormClose = () => {
    setShowForm(false);
    router.push("/inventory");
  };

  if (!showForm) {
    return null;
  }

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-8">
      <ProductForm
        onFormClose={handleFormClose}
        isNewProduct={false}
        productId={params.id}
      />
    </div>
  );
};

export default EditProductPage;
