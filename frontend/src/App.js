import { useState } from "react";
import { nanoid } from "nanoid";
import ShowTodo from "./ShowTodo";
import { setCaretPosition, useLocalStorage } from "./Utils";
import styles from "./App.module.css";

function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [inputVal, setInputVal] = useState("");

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
          <button class={styles.addBtn} onClick={handleAddTodo}>
            Add Todo
          </button>
        </div>
      </div>

      <ShowTodo todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
