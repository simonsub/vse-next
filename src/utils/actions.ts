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

export const redirectSearchParams = async (formData: FormData) => {
  const location = formData.get("location")?.toString() ?? "";
  const brandId = formData.get("brandId")?.toString() ?? "";
  const modelId = formData.get("modelId")?.toString() ?? "";

  redirect(`?location=${location}&brandId=${brandId}&modelId=${modelId}`);
};

export const getCars = async (
  brandId: string | null,
  modelId: string | null,
  location: string | null
) => {
  let cars;

  if (!brandId && !modelId && !location) {
    cars = await prisma.car.findMany({
      include: {
        model: true,
        brand: true,
      },
    });
  } else {
    cars = await prisma.car.findMany({
      include: {
        model: true,
        brand: true,
      },
      where: {
        AND: [
          brandId && modelId && location
            ? { brandId, modelId, location: { contains: location } }
            : brandId && modelId
            ? { brandId, modelId }
            : location
            ? { location: { contains: location } }
            : {},
        ],
      },
    });
  }

  return cars;
};
