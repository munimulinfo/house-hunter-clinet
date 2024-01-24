import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  if (!token) {
    useEffect(() => {
      navigate("/login");
    }, []);
  }
  return children;
};

export default ProtectRoute;
