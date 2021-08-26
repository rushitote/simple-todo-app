import { useState } from "react";
import { nanoid } from "nanoid";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ShowTodo from "./ShowTodo";
import NavBar from "./NavBar";
import { Login, Register } from "./Auth";
import { setCaretPosition, useLocalStorage } from "./Utils";
import styles from "./App.module.css";

function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [inputVal, setInputVal] = useState("");
  const [user] = useLocalStorage("user", { isLoggedIn: false });

  const handleAddTodo = () => {
    if (inputVal !== "") {
      let newTodo = {
        id: nanoid(),
        value: inputVal,
        done: false,
      };
      setTodos([...todos, newTodo]);
      setInputVal("");
      setCaretPosition("todo-input", 0);
    }
  };

  return (
    <div className={styles.mainClass}>
      {!user.isLoggedIn ? <Redirect to="/login" /> : ""}
      <NavBar />
      <h1 className={styles.h1Tag}>Simple Todo App</h1>
      <div className={styles.rowClass}>
        <div className={styles.padClass}>
          <input
            className={styles.inp}
            autoFocus
            type="text"
            placeholder="Todo"
            id="todo-input"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleAddTodo();
              }
            }}
          ></input>
        </div>
        <div className={styles.padClass}>
          <button className={styles.addBtn} onClick={handleAddTodo}>
            Add Todo
          </button>
        </div>
      </div>

      <ShowTodo todos={todos} setTodos={setTodos} />
    </div>
  );
}

function router() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default router;
