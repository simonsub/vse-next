"use server";

import { redirect } from "next/navigation";
import prisma from "./prisma";

export const createCar = async (formData: FormData) => {
  const modelId = formData.get("modelId")?.toString();
  const brandId = formData.get("brandId")?.toString();
  const location = formData.get("location")?.toString();
  const description = formData.get("description")?.toString();
  const price = formData.get("price")?.toString();
  const color = formData.get("color")?.toString();
  const year = formData.get("year")?.toString();
  console.log(price);
  if (!modelId || !brandId || !description) {
    return;
  }

  await prisma.car.create({
    data: {
      modelId: modelId,
      brandId: brandId,
      location: location,
      description: description,
      price: price ? parseFloat(price) : null,
      color: color,
      year: year ? parseInt(year) : null,
    },
  });

  redirect("/");
};
