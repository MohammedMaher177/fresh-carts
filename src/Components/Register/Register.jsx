import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [errorMessage, seterrorMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("The Name Is Required")
      .min(3, "Min Name 3 ")
      .max(20, "Max Name is 20"),
    email: Yup.string()
      .required("Email Is Required")
      .email("Invalid Email Address"),
    password: Yup.string()
      .required("Password Is Required")
      .matches(
        /^(?=.*?[0-9])(?=.*?[A-Za-z])(?=.*?[!#$%&?]).{8,}$/,
        "A password that must contain at least 8 characters and at least one number, one letter and one unique character such as !#$%&?:"
      ),
    rePassword: Yup.string()
      .required("Re Password is Required")
      .oneOf([Yup.ref("password")], "Re Password and password doesnt match"),
    phone: Yup.string()
      .required("Phone Number Is Required")
      .matches(/^\+?2?0?(0[0125][0-9]\d{8}$)/, "Invalid Phone Number"),
  });
  async function handleRegister(values) {
    setisLoading(true);
    const { data } = await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signup", values)
      .catch((err) => {
        seterrorMessage(err.response.data.message);
        setisLoading(false);
      });
    console.log(data);
    if (data.message === "success") {
      seterrorMessage("");
      localStorage.setItem("FreshCartToken", data.token);
      navigate("/login");
    }
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: handleRegister,
    validationSchema,
  });
  return (
    <>
      <div className="py-5">
        <h1 className="mb-5 fw-bolder">Register Now: </h1>
        {errorMessage !== "" ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : null}
        <form
          className="w-100 position-relative"
          onSubmit={formik.handleSubmit}
        >
          {/* NAME */}
          <label htmlFor="name" className=" form-group w-100 mb-5 fs-5 fw-bold">
            Name
            <input
              type="text"
              name="name"
              id="name"
              className=" form-control"
              placeholder="Enter Your Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="alert alert-danger fw-light fs-6 py-1 position-absolute w-100">
                {formik.errors.name}
              </div>
            ) : null}
          </label>
          {/* EMAIL */}
          <label
            htmlFor="email"
            className=" form-group w-100 mb-5 fs-5 fw-bold"
          >
            Email
            <input
              type="email"
              name="email"
              id="email"
              className=" form-control"
              placeholder="Enter Your Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger fw-light fs-6 py-1 position-absolute w-100">
                {formik.errors.email}
              </div>
            ) : null}
          </label>
          {/* PASSWORD */}
          <label
            htmlFor="password"
            className=" form-group w-100 mb-5 fs-5 fw-bold"
          >
            Password
            <input
              autoComplete="off"
              type="password"
              name="password"
              id="password"
              className=" form-control"
              placeholder="Enter Your Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger fw-light fs-6 py-1 position-absolute w-100">
                {formik.errors.password}
              </div>
            ) : null}
          </label>

          {/* REPASSWORD */}
          <label
            htmlFor="rePassword"
            className=" form-group w-100 mb-5 fs-5 fw-bold"
          >
            Re Password
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              autoComplete="off"
              className=" form-control"
              placeholder="Enter Your RePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="alert alert-danger fw-light fs-6 py-1 position-absolute w-100">
                {formik.errors.rePassword}
              </div>
            ) : null}
          </label>
          {/* PHONE */}
          <label
            htmlFor="phone"
            className=" form-group w-100 mb-5 fs-5 fw-bold"
          >
            Phone Number
            <input
              type="phone"
              name="phone"
              id="phone"
              className=" form-control"
              placeholder="Enter Your phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className="alert alert-danger fw-light fs-6 py-1 position-absolute w-100">
                {formik.errors.phone}
              </div>
            ) : null}
          </label>
          {!isLoading ? (
            <button
              type="submit"
              className="btn btn-outline-success fw-bolder d-flex ms-auto"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Register
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
