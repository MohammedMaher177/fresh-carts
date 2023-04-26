import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const cartContext = createContext();
const token = localStorage.getItem("FreshCartToken");

export function CartContextProvider(props) {
  const [numbOfCartItem, setnumbOfCartItem] = useState(0);
  function addToCart(productId) {
    return axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/cart`,
        {
          productId,
        },
        {
          headers: {
            token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setnumbOfCartItem(res.data.numOfCartItems);

        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
  function getCartData() {
    return axios
      .get(`https://route-ecommerce.onrender.com/api/v1/cart`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        // console.log(res);
        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err;
      });
  }

  async function getLoggedCart() {
    const response = await getCartData();
    if (response?.data.status == "success") {
      setnumbOfCartItem(response.data.numOfCartItems);
    }
  }
  function removeItem(productId) {
    return axios
      .delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        // console.log(res);
        setnumbOfCartItem(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err;
      });
  }

  function updateQuantity(productId, count) {
    return axios
      .put(
        `https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers: {
            token,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err;
      });
  }
  useEffect(() => {
    getLoggedCart();
  }, []);
  return (
    <cartContext.Provider
      value={{
        cartContext,
        CartContextProvider,
        addToCart,
        getCartData,
        removeItem,
        updateQuantity,
        numbOfCartItem,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
