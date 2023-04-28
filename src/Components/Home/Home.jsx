import React, { useContext, useEffect, useState } from "react";
import MainSlider from "../MainSlider/MainSlider";
import axios from "axios";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { Toaster, toast } from "react-hot-toast";
import Products from "../Products/Products";
import Test from '../Test/Test'
export default function Home() {
  const [products, setproducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  let { addToCart } = useContext(cartContext);
  
  

  return (
    <>
      {isLoading && (
        <div className=" position-absolute end-0 start-0 z-n1 top-0 bottom-0 bg-light align-items-center d-flex justify-content-center">
          <i className="fa-solid text-main fa-spinner fa-spin  fs-1"></i>
        </div>
      )}
      
      <div className="row py-5">
        <div className="col-lg-4">
          <MainSlider />
        </div>
        <Toaster />
        <Products />
      </div>
    </>
  );
}
