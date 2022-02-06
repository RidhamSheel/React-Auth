import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import Alert from "./Alert";

export default function Home() {
  const { currUser, logOut } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlelogOutClick = async () => {
    try {
      setLoading(true);
      await logOut();
      setError("");
      navigate("/login");
    } catch (error) {
      setError("Failed to Log Out");
    }
    setLoading(false);
  };
  return (
    <div>
      {loading && <Spinner />}
      <div className="card">
        <div className="card-body">
          {error && <Alert msg={error} type="danger" />}
          <p>
            <strong>
              Welcome! User: {currUser ? currUser.email : "Logged Out"}
            </strong>
          </p>
        </div>
        <div className="card-footer">
          <button className="w-100 btn btn-primary" onClick={handlelogOutClick}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
