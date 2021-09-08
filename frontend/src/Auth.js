import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "./NavBar";
import { useLocalStorage, setCaretPosition, fetchURL } from "./Utils";
import styles from "./Auth.module.css";

function LoginComponent({ setTodos }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useLocalStorage("user", { isLoggedIn: false });

  const handleLogin = async () => {
    let data = {
      username: username,
      password: password,
    };
    fetchURL(data, "/login").then((res) => {
      if (!res.ok) {
        setUsername("");
        setPassword("");
        alert(res.body.err);
        return;
      }
      fetchURL({}, "/get").then((response) => {
        response.json().then((json) => {
          window.localStorage.setItem("todos", json.todos);
          setTodos(JSON.parse(json.todos));
        });
        setUser({
          isLoggedIn: true,
        });
      });
    });
  };

  return (
    <div className={styles.colClass}>
      <h1>Login</h1>

      <input
        className={styles.inp}
        autoFocus
        type="text"
        placeholder="Your username"
        id="email-input"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter" && username !== "") {
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    let data = {
      username: username,
      password: password,
    };
    fetchURL(data, "/create").then((res) => {
      if (!res.ok) {
        setUsername("");
        setPassword("");
        alert(res.body.err);
        return;
      }
      <Redirect to="/login" />;
    });
  };

  return (
    <div className={styles.colClass}>
      <h1>Register</h1>

      <input
        className={styles.inp}
        autoFocus
        type="text"
        placeholder="Your username"
        id="email-input"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter" && username !== "") {
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
    </div>
  );
}

export function Login({ setTodos }) {
  return (
    <div className={styles.mainClass}>
      <NavBar />
      <LoginComponent setTodos={setTodos} />
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
