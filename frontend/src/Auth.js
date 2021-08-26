import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "./NavBar";
import { useLocalStorage, setCaretPosition } from "./Utils";
import styles from "./Auth.module.css";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useLocalStorage("user", { isLoggedIn: false });

  const handleLogin = () => {
    setUser({
      isLoggedIn: true,
    });
  };

  return (
    <div className={styles.colClass}>
      <h1>Login</h1>

      <input
        className={styles.inp}
        autoFocus
        type="email"
        placeholder="Your email"
        id="email-input"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter" && email !== "") {
            setCaretPosition("password-input", 0);
          }
        }}
      ></input>

      <input
        className={styles.inp}
        type="password"
        placeholder="Your password"
        id="password-input"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter" && password !== "") {
            handleLogin();
          }
        }}
      ></input>

      <button className={styles.actBtn} onClick={handleLogin}>
        Login
      </button>
      {user.isLoggedIn ? <Redirect to="/" /> : ""}
    </div>
  );
}

function RegisterComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useLocalStorage("user", { isLoggedIn: false });

  const handleRegister = () => {
    setUser({
      isLoggedIn: true,
    });
  };

  return (
    <div className={styles.colClass}>
      <h1>Register</h1>

      <input
        className={styles.inp}
        autoFocus
        type="email"
        placeholder="Your email"
        id="email-input"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter" && email !== "") {
            setCaretPosition("password-input", 0);
          }
        }}
      ></input>

      <input
        className={styles.inp}
        type="password"
        placeholder="Your password"
        id="password-input"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter" && password !== "") {
            handleRegister();
          }
        }}
      ></input>

      <button className={styles.actBtn} onClick={handleRegister}>
        Register
      </button>
      {user.isLoggedIn ? <Redirect to="/" /> : ""}
    </div>
  );
}

export function Login() {
  return (
    <div className={styles.mainClass}>
      <NavBar />
      <LoginComponent />
    </div>
  );
}

export function Register() {
  return (
    <div className={styles.mainClass}>
      <NavBar />
      <RegisterComponent />
    </div>
  );
}
