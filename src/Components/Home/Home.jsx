import React, { useContext, useEffect, useState } from "react";
import MainSlider from "../MainSlider/MainSlider";
import axios from "axios";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { Toaster, toast } from "react-hot-toast";
import Products from "../Products/Products";
export default function Home() {
  const [products, setproducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  let { addToCart } = useContext(cartContext);
  function addProductToCart(id) {
    let response = addToCart(id);

    toast.promise(
      response,
      {
        loading: "Loading, Please Wait",
        success: "Added Success",
        error: "Error when fetching",
      },
      {
        position: "top-right",
      }
    );
  }
  async function getProducts() {
    return await axios
      .get(`https://route-ecommerce.onrender.com/api/v1/products`)
      .then((res) => {
        setproducts(res.data.data);
        setisLoading(false);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {isLoading && (
        <div className=" position-absolute end-0 start-0 z-n1 top-0 bottom-0 bg-light align-items-center d-flex justify-content-center">
          <i className="fa-solid text-main fa-spinner fa-spin  fs-1"></i>
        </div>
      )}
      <Toaster />
      <div className="row py-5">
        <div className="col-4">
          <MainSlider />
        </div>

        <Products />
      </div>
    </>
  );
}
