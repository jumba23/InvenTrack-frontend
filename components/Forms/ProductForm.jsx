"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const newItemSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  price: z.number().positive("Price must be a positive number"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
});

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(newItemSchema),
  });

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-grow p-4 overflow-hidden bg-white rounded-lg"
    >
      <div>
        <h1 className="flex align-middle">Add New Product</h1>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input type="number" id="price" {...register("price")} />
        {errors.price && <span>{errors.price.message}</span>}
      </div>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input type="number" id="quantity" {...register("quantity")} />
        {errors.quantity && <span>{errors.quantity.message}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
