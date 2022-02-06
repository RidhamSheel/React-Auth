import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Alert from "./Alert";

import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faKey } from "@fortawesome/free-solid-svg-icons";

export default function SignUp() {
  const emailRef = useRef();
  const passRef = useRef();
  const conPassRef = useRef();
  const navigate = useNavigate();

  const { signUp } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUpClick = async (e) => {
    e.preventDefault();
    if (passRef.current.value !== conPassRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(emailRef.current.value, passRef.current.value);
      navigate("/");
    } catch (error) {
      setError("Failed to create account");
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
            <h2 className="text-center">Sign Up!</h2>
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
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <FontAwesomeIcon icon={faKey} className="mx-1" />
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmpassword"
                ref={conPassRef}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div className="w-100 text-center my-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}
