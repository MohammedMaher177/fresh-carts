import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { Toaster, toast } from "react-hot-toast";

export default function Cart() {
  const { getCartData, removeItem, updateQuantity } = useContext(cartContext);
  const [cartDetails, setcartDetails] = useState(null);
  const [isLoading, setisLoading] = useState(true)
  async function getFetch() {
    const response = await getCartData();
    if (response?.data?.status === "success") {
      setcartDetails(response);
      setisLoading(false)
    }
  }

  async function deleteItem(productId) {
    toast.loading("Removing...", {
      position: "top-right",
    });
    const response = await removeItem(productId);
    toast.remove();
    toast.success("Removed Success", {
      position: "top-right",
    });
    console.log(response);
    setcartDetails(response);
  }

  async function updateProductCount(productId, count) {
    toast.loading("Loading...", {
      position: "top-right",
    });
    const response = await updateQuantity(productId, count);
    toast.remove();
    toast.success("Successfully", {
      position: "top-right",
    });
    console.log(response);
    setcartDetails(response);
  }
  useEffect(() => {
    getFetch();
  }, []);
  return (
    <>
      {isLoading && (
        <div className=" position-absolute end-0 start-0 z-n1 top-0 bottom-0 bg-light align-items-center d-flex justify-content-center">
          <i className="fa-solid text-main fa-spinner fa-spin  fs-1"></i>
        </div>
      )}
      <Toaster />
      <div className="container-fluid py-5">
        <h1>Shop Cart:</h1>
        <h5 className=" text-main">
          Total Cart Price :{cartDetails?.data?.data?.totalCartPrice}
        </h5>
        <h5 className=" text-main">
          Total Cart Item :{cartDetails?.data?.numOfCartItems}
        </h5>

        {cartDetails?.data?.data.products.map((product) => (
          <div
            className="row border-bottom py-2 align-items-center"
            key={product.product._id}
          >
            <div className="col-2 d-flex ">
              <img src={product.product.imageCover} alt="" className="w-100" />
            </div>
            <div className="col-10 d-flex justify-content-between">
              <span>
                <h6 className="w-100">{product.product.title}</h6>
                <h6 className="text-main">Price: {product.price}</h6>
                <button
                  className="btn btn-outline-success"
                  onClick={() => deleteItem(product.product._id)}
                >
                  <i className="fa-regular fa-trash-can text-main me-1"></i>
                  Delete
                </button>
              </span>
              <span className="d-flex align-items-center">
                <button
                  className="btn border-main btn-sm"
                  onClick={() =>
                    updateProductCount(product.product._id, product.count + 1)
                  }
                >
                  +
                </button>
                <span className="mx-1">{product.count}</span>
                <button
                  className="btn border-main btn-sm"
                  onClick={() =>
                    updateProductCount(product.product._id, product.count - 1)
                  }
                >
                  -
                </button>
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
