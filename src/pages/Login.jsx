import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaSkating } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUserLoginMutation } from "../redux/api/baseApi";
import { toast } from "react-hot-toast";
import { decodedToken } from "../utils/decodedToken";
import { loginUser } from "../redux/featuers/auth/authSlice";

const Login = () => {
  const [shows, setShows] = useState(false);
  const navigate = useNavigate();
  const [userLogin, { data, isLoading }] = useUserLoginMutation();
  const dispatch = useDispatch();

  //password text toogle
  const handleVisiblePasswordFirst = () => {
    setShows(!shows);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const userData = {
        email: data.email,
        password: data.password,
      };
      const result = await userLogin(userData).unwrap();
      const user = decodedToken(result.token);
      const userInfo = {
        user,
        token: result.token,
      };
      dispatch(loginUser(userInfo));
      toast.success("user Login Succesfull");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-200">
      <div className="w-full h-full md:px-20 px-5 flex justify-center items-center  ">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="border-2 border-emerald-500 rounded-lg bg-gray-100 p-6 auth-shadow"
          action=""
        >
          <h1 className="text-2xl text-center mb-2 font-serif text-emerald-500 uppercase font-bold ">
            Login House Hunter
          </h1>
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

          <div className="form-control relative w-full">
            <label className="label">
              <span className="label-text font-bold font-serif text-emerald-500">
                Password
              </span>
            </label>
            <input
              type={shows ? "text" : "password"}
              {...register("password", { required: true })}
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
              <p className="text-red-600 animate-pulse">Password is required</p>
            )}
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn bg-emerald-500 text-lg  text-white  font-sans hover:bg-emerald-500 border-0"
            >
              {isLoading ? <FaSkating className="animate-bounce" /> : "Login"}
              {/* {"Login"} */}
            </button>
          </div>
          <h1 className="text-center mt-3">
            Already registered? Go to{" "}
            <span className="text-emerald-500 font-semibold underline">
              <Link to="/register">Register</Link>
            </span>
          </h1>
        </form>
      </div>
    </div>
  );
};

export default Login;
