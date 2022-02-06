import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { currUser } = useAuth();
  return currUser ? children : <Navigate to="/login" />;
}
