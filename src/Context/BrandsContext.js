import axios from "axios";
import { createContext, useContext, useEffect } from "react";
import Brands from "../Components/Brands/Brands";

export const brandsContext = createContext();

export function BrandsContextProvider(props) {
  async function getAllBrands() {
    const response = await axios
      .get(`https://route-ecommerce.onrender.com/api/v1/brands`)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <brandsContext.provider value={{getAllBrands}}>
      {props.children}
    </brandsContext.provider>
  );
}
