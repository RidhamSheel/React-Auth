import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Alert from "./Alert";
import Spinner from "./Spinner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";

export default function ForgotPassword() {
  const emailRef = useRef();

  const { resetPassword } = useAuth();

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetClick = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMsg("Check your mail for further instructions");
    } catch (error) {
      setError("Failed to reset your password!");
    }
    setLoading(false);
  };
  return (
    <div className="mx-3">
      {loading && <Spinner />}
      <div className="card">
        <div className="card-body">
          <form>
            <h2 className="text-center mb-4">Reset Your Password</h2>
            {error && <Alert msg={error} type="danger" />}
            {msg && <Alert msg={msg} type="success" />}
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
            <button
              type="submit"
              className="btn btn-primary w-100"
              onClick={handleResetClick}
            >
              Reset Password
            </button>
            <div className="w-100 text-center my-2">
              <Link to="/login">Log In</Link>
            </div>
          </form>
        </div>
      </div>
      <div className="w-100 text-center my-2">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
