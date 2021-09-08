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
import { setCaretPosition, useLocalStorage, fetchURL } from "./Utils";
import styles from "./App.module.css";

function AppRouter() {
  const [todos, setTodos] = useLocalStorage("todos", []);

  function TodoApp() {
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
        fetchURL({ todos: JSON.stringify([...todos, newTodo]) }, "/update");
        setInputVal("");
        setCaretPosition("todo-input", 0);
      }
    };

    return (
      <div className={styles.mainClass}>
        {!user.isLoggedIn ? <Redirect to="/login" /> : ""}
        <NavBar setTodos={setTodos} />
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

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <TodoApp />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/login">
            <Login setTodos={setTodos} />
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

export default AppRouter;
