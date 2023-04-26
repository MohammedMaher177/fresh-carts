import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { cartContext } from "../../Context/CartContext";
import { Toaster, toast } from "react-hot-toast";

export default function ProductDetails() {
  const { addToCart } = useContext(cartContext);
  const { id } = useParams();
  const [product, setproduct] = useState({});
  const [isLoading, setisLoading] = useState(true);
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
  function getData() {
    return axios
      .get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
      .then((res) => {
        setproduct(res.data.data);
        setisLoading(false);
      })
      .catch((err) => {
        //ADD ERROR HERE PLEASE 

      });
  }
  useEffect(() => {
    getData();
  }, []);
  const settings = {
    dots: true,
    speed: 500,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: {
      delay: 500,
      disableOnInteraction: false,
    },
  };
  return (
    <>
    <Toaster />
      {isLoading && (
        <div className=" position-absolute end-0 start-0 z-n1 top-0 bottom-0 bg-light bg-opacity5 align-items-center d-flex justify-content-center">
          <i className="fa-solid text-main fa-spinner fa-spin text-main fs-1"></i>
        </div>
      )}

      <div className="row py-5 align-items-center gx-4">
        <div className="col-md-4">
          <Slider {...settings}>
            {product?.images?.map((imag, ind) => (
              <img src={imag} alt="" key={ind} />
            ))}
          </Slider>
        </div>
        <div className="col-md-8">
          <h2>{product?.title}</h2>
          <p>{product?.description}</p>
          <div className="d-flex justify-content-between">
            <div>
              <h4>{product?.category?.name}</h4>
              <h4>{product?.price}</h4>
            </div>
            <h4>
              <i className="fa-solid fa-star rating-color"></i>
              {product?.ratingsAverage}
            </h4>
          </div>
          <button
            className="btn btn-success w-100 "
            onClick={() => {
              addProductToCart(product._id);
            }}
          >
            <i className="fa-solid fa-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
