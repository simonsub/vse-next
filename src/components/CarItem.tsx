import { Car } from "@prisma/client";

const CarItem = ({ car }: { car: Car }) => {
  return <div>{car.brandId}</div>;
};
export default CarItem;
