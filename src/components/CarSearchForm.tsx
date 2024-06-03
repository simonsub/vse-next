"use client";
import { redirectSearchParams } from "@/utils/actions";
import { Brand, CarModel } from "@prisma/client";
import { useState, useMemo } from "react";

const CarSearchForm = ({
  models,
  brands,
}: {
  models: CarModel[];
  brands: Brand[];
}) => {
  const [brandId, setBrandId] = useState("");

  const filteredModels = useMemo(() => {
    return models.filter((model) => model.brandId === brandId);
  }, [brandId, models]);

  return (
    <div>
      <div className="formContainerSearch">
        <h2>Search for your car</h2>
        <div className="formContainerSearchInner">
          <form action={redirectSearchParams} className="form flex flex-col">
            <div>
              <label htmlFor="location">Location</label>
              <input
                name="location"
                id="location"
                placeholder="Select your location..."
              />
            </div>

            <div>
              <label htmlFor="brand">Brand</label>
              <select
                name="brandId"
                id="brandId"
                onChange={(e) => {
                  setBrandId(e.target.value);
                }}
              >
                <option disabled selected value={""}></option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="model">Model</label>
              <select
                name="modelId"
                id="modelId"
                required={brandId !== "" || null ? true : false}
              >
                {filteredModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>

            <input type="hidden" name="brandId" value={brandId} />

            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarSearchForm;
