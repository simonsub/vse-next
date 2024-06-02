import CarItem from "./CarItem";
import { CarWithDeps } from "@/types/prismaTypes";
import NoResults from "./NoResults";

type Props = {
  cars: CarWithDeps[];
};

const CarList = ({ cars }: Props) => {
  console.log(cars);
  return (
    <div className="px-10">
      {!cars || (cars.length < 1 && <NoResults />)}
      {cars.map((car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
