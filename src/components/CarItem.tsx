import { CarWithDeps } from "@/types/prismaTypes";
import Link from "next/link";

const CarItem = ({ car }: { car: CarWithDeps }) => {
  return (
    <div className="carItemContainer">
      <Link href={`/car/${car.id}`} className="carItemLink">
        <div className="carItemDetails">
          <h3>
            {car.brand.name} {car.model.name}
          </h3>
          <small>{`Year: ${car.year}`}</small>
          <br />
          <small>{`Color: ${car.color ?? "no color"}, location: ${
            car.location ?? "No location"
          }, price: ${car.price} CZK`}</small>
        </div>
      </Link>
    </div>
  );
};

export default CarItem;
