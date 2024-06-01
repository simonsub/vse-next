import { createCar } from "@/utils/actions";
import { Brand, CarModel } from "@prisma/client";
import BrandAndModelFormFields from "./BrandAndModelFormFields";

const NewCarForm = ({
  models,
  brands,
}: {
  models: CarModel[];
  brands: Brand[];
}) => {
  return (
    <div className={"formContainer bg-gray-100"}>
      <form action={createCar} className="form flex flex-col">
        <BrandAndModelFormFields models={models} brands={brands} />
        <label htmlFor="location">Location</label>
        <input type="text" name="location" required={true} />
        <label htmlFor="description">Description</label>
        <input type="text" name="description" required={true} />
        <label htmlFor="price">Price</label>
        <input type="text" name="price" required={true} />
        <label htmlFor="color">Color</label>
        <input type="text" name="color" required={true} />
        <label htmlFor="year">Year</label>
        <input type="text" name="year" required={true} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default NewCarForm;
