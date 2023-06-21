import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
export default function Products() {
  const [products, setproducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  let { addToCart } = useContext(cartContext);

  async function getProducts() {
    return await axios
      .get(`https://route-ecommerce.onrender.com/api/v1/products`)
      .then((res) => {
        setproducts(res.data.data);
        setisLoading(false);
      });
  }
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
      <div className="row">
        {products?.map((product) => (
          <div className="col-lg-3 col-md-4 col-sm-6 product" key={product._id}>
            <Link to={`productDetails/${product._id}`}>
              <div className=" cursor-pointer py-2 px-3">
                <img src={product.imageCover} alt="" className="w-100" />
                <span className="text-main fw-bold font-sm">
                  {product?.subcategory[0].name}
                </span>
                <h4 className=" fw-bolder mx-auto">
                  {product.title.split(" ").splice(0, 2).join(" ")}
                </h4>
                <div className="d-flex justify-content-between">
                  <span className=" text-muted">{product.price} EGP</span>
                  <span>
                    {" "}
                    <i className="fas fa-star rating-color"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
              </div>
            </Link>
            <button
              className="btn bg-main text-white w-75 mx-auto d-flex btn-sm mb-md-2"
              onClick={() => {
                addProductToCart(product._id);
              }}
            >
              + ADD TO CART
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
