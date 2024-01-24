import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaSkating } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useUserRegisterMutation } from "../redux/api/baseApi";

const Register = () => {
  const [shows, setShows] = useState(false);
  const [userRegister, { isLoading }] = useUserRegisterMutation();
  const navigate = useNavigate();

  //password text toogle
  const handleVisiblePasswordFirst = () => {
    setShows(!shows);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormData = (data) => {
    try {
      const result = userRegister(data).unwrap();
      console.log(result);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col md:py-5 justify-center items-center  bg-gray-200">
      <div className="w-full h-full md:px-20 px-5 flex justify-center bg-gray-200  items-center  ">
        <form
          onSubmit={handleSubmit(handleFormData)}
          className="border-2 border-emerald-500 mt-10 rounded-lg bg-gray-100 p-5 auth-shadow"
          action=""
        >
          <h1 className="text-2xl text-center mb-2 font-serif text-emerald-500 uppercase font-bold ">
            Register House Hunter
          </h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold font-serif text-emerald-500">
                User Name
              </span>
            </label>
            <input
              type="text"
              {...register("fullName", { required: true })}
              placeholder="Enter your Name"
              className="input input-bordered"
            />
            {errors.fullName && (
              <span className="text-rose-500 animate-pulse">
                please provide your User Name
              </span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold font-serif text-emerald-500">
                User Email
              </span>
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your Email"
              className="input input-bordered"
            />
            {errors.email && (
              <span className="text-rose-500 animate-pulse">
                please provide your Email
              </span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold font-serif text-emerald-500">
                Select Role
              </span>
            </label>
            <select
              {...register("role", { required: true })}
              className="select w-full border border-black "
            >
              <option disabled selected>
                select your role
              </option>
              <option value={"house-owner"}>house-owner</option>
              <option value={"house-renter"}>house-renter</option>
            </select>
            {errors.role && (
              <span className="text-rose-500 animate-pulse">
                please select an role
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold font-serif text-emerald-500">
                User PhoneNumber
              </span>
            </label>
            <input
              type="number"
              {...register("phone", { required: true })}
              placeholder="Enter your Email"
              className="input input-bordered"
            />
            {errors.phone && (
              <span className="text-rose-500 animate-pulse">
                please provide your PhoneNumber
              </span>
            )}
          </div>

          <div className="form-control relative w-full">
            <label className="label">
              <span className="label-text font-bold font-serif text-emerald-500">
                Password
              </span>
            </label>
            <input
              type={shows ? "text" : "password"}
              {...register("password", {
                required: true,
                pattern: /(?=.*[A-Z])(?=.*\d)/,
                minLength: 6,
              })}
              placeholder="password"
              className="input input-bordered"
            />
            <span
              onClick={handleVisiblePasswordFirst}
              className="absolute  top-[50px] right-4 text-[18px]"
            >
              {shows ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
            </span>
            {errors.password?.type === "required" && (
              <p className="text-red-600  animate-pulse">
                Password is required
              </p>
            )}
            {errors.password?.type === "minLength  animate-pulse" && (
              <p className="text-red-600">Password must be 6 characters</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600  animate-pulse">
                Password must have one Uppercase & one Number.
              </p>
            )}
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn bg-emerald-500 text-white  font-serif hover:bg-emerald-500 border-0"
            >
              {isLoading ? (
                <FaSkating className="animate-bounce" />
              ) : (
                "Create Acount"
              )}
            </button>
          </div>
          <h1 className="text-center mt-3">
            Already registered? Go to{" "}
            <span className="text-emerald-500 font-semibold underline">
              <Link to="/login">Login</Link>
            </span>
          </h1>
        </form>
      </div>
    </div>
  );
};

export default Register;
