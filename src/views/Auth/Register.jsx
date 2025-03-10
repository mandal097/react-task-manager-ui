import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Styles.module.scss";
import { BiArrowBack, BiHide, BiShow } from "react-icons/bi";
import axios from "../../config/axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userRedux";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false); // for hiding password field

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
     return setResponseMessage("Please fill all fields");
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      return setResponseMessage("Invalid email");
    }
    setLoading(true);
    try {
      const res = await axios.post("user/register", {
        name: name,
        email: email,
        password: password,
      });
      if (res.data.status === "success") {
        setResponseMessage(res.data.message);
        localStorage.setItem("token", res.data.token);
        dispatch(login(res.data.data));
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
      if (res.data.status === "err") {
       return setResponseMessage(res.data.message);
      }
      setTimeout(() => {
        setResponseMessage("");
      }, 4000);
    } catch (error) {
      console.log("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.auth_page}>
      <div className={styles.form}>
        <div className={styles.form_wrap}>
          <h1>Register </h1>
          <div className={styles.navigate_back} onClick={() => navigate(-1)}>
            <BiArrowBack className={styles.icon} />
          </div>
          <div className={styles.input_field}>
            <label htmlFor="">Name :</label>
            <input
              type="text"
              required
              placeholder="write your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.input_field}>
            <label htmlFor="">Email :</label>
            <input
              type="email"
              required
              placeholder="write your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.input_field}>
            <label htmlFor="">Password :</label>
            <input
              type={show ? "text" : "password"}
              required
              placeholder="write your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.show_hide} onClick={() => setShow(!show)}>
              {show ? (
                <BiHide className={styles.icon} />
              ) : (
                <BiShow className={styles.icon} />
              )}
            </div>
          </div>
          <div className={styles.input_field}>
            <button onClick={submit}>
              {loading ? "loading..." : "SUBMIT"}
            </button>
          </div>
          <div className={styles.navigate}>
            <p style={{ color: "hotpink" }}>{responseMessage}</p>
          </div>
          <div className={styles.navigate}>
            <p>
              Already have an account{" "}
              <span onClick={() => navigate("/login")}>login</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
