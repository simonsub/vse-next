"use client";
import { Brand, CarModel } from "@prisma/client";
import { useMemo, useState } from "react";

const BrandAndModelFormFields = ({
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
    <>
      <label htmlFor="brand">Brand</label>
      <select
        name="brandId"
        required={true}
        id=""
        value={brandId}
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
      <label htmlFor="model">Model</label>
      <select name="modelId" required={true}>
        {filteredModels.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default BrandAndModelFormFields;
