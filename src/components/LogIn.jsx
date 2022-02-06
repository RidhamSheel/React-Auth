import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";

import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faKey } from "@fortawesome/free-solid-svg-icons";

export default function LogIn() {
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();

  const { logIn } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogInClick = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await logIn(emailRef.current.value, passRef.current.value);
      navigate("/");
    } catch (error) {
      setError("Failed to log in");
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className="mx-3">
      {loading && <Spinner />}
      <div className="card">
        <div className="card-body">
          <form>
            <h2 className="text-center">Log In!</h2>
            {error && <Alert msg={error} type="danger" />}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <FontAwesomeIcon icon={faAt} className="mx-1" />
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                ref={emailRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <FontAwesomeIcon icon={faKey} className="mx-1" />
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                ref={passRef}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              onClick={handleLogInClick}
            >
              Log In
            </button>
          </form>
        </div>
      </div>
      <div className="w-100 text-center my-2">
        Forgotten your password?{" "}
        <Link to="/forgotPassword">Reset Password</Link>
      </div>
      <div className="w-100 text-center my-2">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
