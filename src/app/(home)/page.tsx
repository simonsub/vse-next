import CarList from "@/components/CarList";
import CarSearchForm from "@/components/CarSearchForm";
import { getCars } from "@/utils/actions";
import prisma from "@/utils/prisma";

const fetchBrands = async () => {
  const brands = await prisma.brand.findMany();
  return brands;
};

const fetchModels = async () => {
  const models = await prisma.carModel.findMany();
  return models;
};

const HomePage = async ({
  searchParams,
}: {
  searchParams: {
    location?: string | null;
    brandId?: string | null;
    modelId?: string | null;
  };
}) => {
  const brands = await fetchBrands();
  const models = await fetchModels();

  const cars = await getCars(
    searchParams.brandId || null,
    searchParams.modelId || null,
    searchParams.location || null
  );

  return (
    <div className="bg-gray-100">
      <CarSearchForm brands={brands} models={models} />
      <CarList cars={cars} />
    </div>
  );
};

export default HomePage;
