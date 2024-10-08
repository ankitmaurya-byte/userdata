import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "../style.scss";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Spinner from "../../layouts/Spinner";

function Register() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [unfill, setUnfill] = useState(false);

  const handelclick = async (event) => {
    event.preventDefault();
    setloading(true);
    let name = event.target[0].value;
    let Email = event.target[1].value;
    let password = event.target[2].value;
    if (name && Email && password) {
      let result = await axios.post("http://localhost:5000/sinup", {
        name,
        Email,
        password,
      });
      let data = await result.data;
      console.log(data);

      setloading(false);

      localStorage.setItem("users", JSON.stringify(data.data));
      toast("register succesfull");

      localStorage.setItem("auth", JSON.stringify(data.auth));
      navigate("/");
    } else {
      setloading(false);
      console.log("write properly");
      toast("Please fill all details");
    }
  };
  useEffect(() => {
    document.title = "Register";
  }, []);
  return (
    <>
      {loading && <Spinner />}
      <div className="register">
        <form onSubmit={handelclick}>
          <input type="text" placeholder="Usename" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Password" />
          <button type="submit">SIN UP</button>
        </form>

        <div className="routetologin">
          already have account <Link to={"/login"}>login here</Link>
          {unfill && <div className="alert">Please fill all the fields</div>}
        </div>
      </div>
    </>
  );
}

export default Register;
