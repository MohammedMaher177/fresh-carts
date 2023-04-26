import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Brands() {
  const [brands, setbrands] = useState([]);
  async function getAllBrands() {
    await axios
      .get(`https://route-ecommerce.onrender.com/api/v1/brands`)
      .then((res) => {
        setbrands(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
  console.log(brands);
  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <div className="py-5 row gy-2">
      {brands?.map((brand) => (
        <div key={brand._id} className="col-md-3">
          <img src={brand.image} alt="" className="w-100" />
        </div>
      ))}
    </div>
  );
}
