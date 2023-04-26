import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authContext } from "../../Context/AuthContext";

export default function Login() {
  let {saveUserData} = useContext(authContext)
  const [isLoading, setisLoading] = useState(false);
  const [response, setresponse] = useState([]);
  const [error, seterror] = useState(null);
  const navigate = useNavigate();
  async function handleLogIn(values) {
    setisLoading(true);
    return await axios
      .post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`, values)
      .then((res) => {
        localStorage.setItem("FreshCartToken", res.data.token);
        console.log(res);
        setresponse(res.data);
        setisLoading(false);
        seterror(null);
        saveUserData();
        navigate("/");
      })
      .catch((err) => {
        setisLoading(false);
        seterror(err.response.data.message);
      });
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogIn,
  });
  return (
    <>
      <div className="py-5">
        <h1 className="mb-5">Log In Now: </h1>
        {error !== null ? (
          <div className="alert alert-danger">{error}</div>
        ) : null}
        <form className=" text-center" onSubmit={formik.handleSubmit}>
          <label htmlFor="email" className="w-100 mb-5">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              className=" form-control"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>
          <label htmlFor="password" className="w-100 mb-5">
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              placeholder="Enter Your Password"
              className=" form-control"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>
          {!isLoading ? (
            <button type="submit" className="btn btn-success ms-auto d-flex">
              Log In
            </button>
          ) : (
            <button type="submit" className="btn btn-success ms-auto d-flex">
              <i className="fa-solid fa-spinner fa-spin"></i>
            </button>
          )}
        </form>
      </div>
    </>
  );
}
