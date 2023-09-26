import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  let { userData, saveUserData, logout } = useContext(authContext);
  let { getCartData, numbOfCartItem } = useContext(cartContext);
  const [useCartCount, setuseCartCount] = useState(0);
  async function getUerCart() {
    const response = await getCartData();
    setuseCartCount(response?.data?.numOfCartItems);
  }
  function ClickLogOut() {
    logout();
    navigate("/login");
  }
  useEffect(() => {
    saveUserData();
    getUerCart();
  }, []);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="">
            <h1 className=" fw-bolder me-3">
              <i className="fa-solid fa-cart-shopping text-main"></i> FreshCart
            </h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData !== null && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="cart">
                    Cart {numbOfCartItem !== 0 ? numbOfCartItem : null}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="brands">
                    Brands
                  </Link>
                </li>
              </ul>
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="https://web.facebook.com/FreshCartFruits"
                  target="_blank"
                >
                  <i className="fa-brands fa-facebook"></i>
                </Link>
              </li>
              {userData === null ? (
                <>
                  <li className="nav-item">
                    <Link to="login" className="nav-link">
                      Log In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="register" className="nav-link">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown d-flex">
                  <span className="nav-item position-relative">
                    <Link className="nav-link" to="cart">
                      <i className="fa-solid fa-cart-shopping fs-4"></i>
                      {numbOfCartItem !== 0 && (
                        <span className=" badge text-white position-absolute top-0 bg-main end-0">
                          {numbOfCartItem}
                        </span>
                      )}
                    </Link>
                  </span>
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userData?.name}
                  </Link>

                  <ul className="dropdown-menu">
                    <li className=" fs-6">
                      <Link className="dropdown-item" to="#">
                        Settings
                      </Link>
                    </li>
                    <li className=" fs-6">
                      <Link className="dropdown-item" to="#">
                        Profile
                      </Link>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li onClick={ClickLogOut}>
                      <Link className="dropdown-item fs-4" to="#">
                        Log Out
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      ;
    </div>
  );
}
