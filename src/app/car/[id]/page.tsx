import prisma from "@/utils/prisma";

const fetchCarDetail = async (id: string) => {
  const car = await prisma.car.findUnique({
    where: {
      id: id,
    },
    include: {
      model: true,
      brand: true,
    },
  });
  return car;
};

const CarDetailPage = async ({ params }: { params: { id: string } }) => {
  const car = await fetchCarDetail(params.id);

  return (
    <div className="carDetailContainer">
      <div className="carDetailHeader">
        <h1>
          {car?.brand.name} {car?.model.name}
        </h1>
      </div>
      <div className="carDetailContent">
        <p>
          <strong>Description:</strong> {car?.description}
        </p>
        <p>
          <strong>Year:</strong> {car?.year}
        </p>
        <p>
          <strong>Color:</strong> {car?.color ?? "No color"}
        </p>
        <p>
          <strong>Location:</strong> {car?.location ?? "No location"}
        </p>
        <p>
          <strong>Price:</strong> {car?.price} CZK
        </p>
      </div>
    </div>
  );
};

export default CarDetailPage;
