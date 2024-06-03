import prisma from "@/utils/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  if (!car) {
    return (
      <div className="carNotFoundContainer">
        <h1>Car Not Found</h1>
        <p>We are sorry, but the car you are looking for does not exist.</p>
        <Link href="/">
          <button>Go Back to Home</button>
        </Link>
      </div>
    );
  }

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

/*function CarDetailsErrorBoundary({ params }: { params: { id: string } }) {
  return (
    <ErrorBoundary fallback={<ErrorComponent />}>
      <CarDetailPage params={params} />
    </ErrorBoundary>
  );
}*/

export default CarDetailPage;
