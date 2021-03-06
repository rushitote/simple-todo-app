import React from "react";
import { Link } from "react-router-dom";
import { useLocalStorage, fetchURL } from "./Utils";
import styles from "./App.module.css";

export default function NavBar({ setTodos }) {
  const [user, setUser] = useLocalStorage("user", { isLoggedIn: false });

  const handleLogOut = () => {
    fetchURL({}, "/logout").then(() => {
      window.localStorage.setItem("todos", JSON.stringify([]));
      setUser({
        isLoggedIn: false,
      });
      setTodos([]);
    });
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.Nav0}>
        <Link to="/">
          <button className={styles.NavBtn}>Home</button>
        </Link>
      </div>
      {!user.isLoggedIn ? (
        <div className={styles.NavNotLoggedIn}>
          <div className={styles.Nav1}>
            <Link to="/login">
              <button className={styles.NavBtn}>Log In</button>
            </Link>
          </div>
          <div className={styles.Nav2}>
            <Link to="/register">
              <button className={styles.NavBtn}>Register</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.Nav1}>
          <Link to="/login">
            <button className={styles.NavBtn} onClick={handleLogOut}>
              Log Out
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
