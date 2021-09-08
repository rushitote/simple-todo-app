import React, { useState } from "react";
import { fetchURL } from "./Utils";
import styles from "./App.module.css";

export default function ShowTodo({ setTodos, todos }) {
  const [updateValue, setUpdateValue] = useState({});
  const [isEditEnabled, setIsEditEnabled] = useState({});

  const handleUpdateTodo = (todo, index) => {
    if (updateValue[todo.id] === "") return;
    if (!isEditEnabled[todo.id]) {
      setIsEditEnabled({
        ...isEditEnabled,
        [todo.id]: true,
      });
      setUpdateValue({
        ...updateValue,
        [todo.id]: todo.value,
      });
    } else {
      const newTodos = [...todos];
      newTodos[index].value = updateValue[todo.id];
      setTodos(newTodos);
      fetchURL({ todos: JSON.stringify(newTodos) }, "/update");
      setIsEditEnabled({
        ...isEditEnabled,
        [todo.id]: false,
      });
    }
  };

  return (
    <div>
      {" "}
      {todos.map((todo, index) => {
        return (
          <div className={styles.fixedRowClass} key={todo.id}>
            <div className={styles.padClass}>
              {" "}
              {!isEditEnabled[todo.id] ? (
                todo.done ? (
                  <p
                    style={{
                      textDecorationLine: "line-through",
                      opacity: "0.4",
                    }}
                  >
                    {todo.value}{" "}
                  </p>
                ) : (
                  <p> {todo.value} </p>
                )
              ) : (
                <input
                  className={styles.inp}
                  type="text"
                  id="update-todo"
                  value={updateValue[todo.id]}
                  onChange={(e) => {
                    setUpdateValue({
                      ...updateValue,
                      [todo.id]: e.target.value,
                    });
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleUpdateTodo(todo, index);
                    }
                  }}
                ></input>
              )}{" "}
            </div>{" "}
            <button
              className={styles.editBtn}
              onClick={() => {
                handleUpdateTodo(todo, index);
              }}
            >
              {!isEditEnabled[todo.id] ? "Edit" : "Update"}{" "}
            </button>{" "}
            {isEditEnabled[todo.id] ? (
              <div className={styles.padClass}>
                <button
                  className={styles.cancelBtn}
                  onClick={() => {
                    setIsEditEnabled({
                      ...isEditEnabled,
                      [todo.id]: false,
                    });
                  }}
                >
                  Cancel{" "}
                </button>{" "}
              </div>
            ) : (
              ""
            )}{" "}
            <div className={styles.padClass}>
              {!todo.done ? (
                <button
                  className={styles.markBtn}
                  onClick={() => {
                    const newTodos = [...todos];
                    newTodos[index].done = !todo.done;
                    setTodos(newTodos);
                    fetchURL({ todos: JSON.stringify(newTodos) }, "/update");
                  }}
                >
                  Mark as done
                </button>
              ) : (
                <button
                  className={styles.markUndoneBtn}
                  onClick={() => {
                    const newTodos = [...todos];
                    newTodos[index].done = !todo.done;
                    setTodos(newTodos);
                    fetchURL({ todos: JSON.stringify(newTodos) }, "/update");
                  }}
                >
                  Mark as undone
                </button>
              )}
            </div>
            <div className={styles.padClass}>
              <button
                className={styles.delBtn}
                onClick={() => {
                  let newTodos = todos.filter(({ id }) => id !== todo.id);
                  setTodos(newTodos);
                  fetchURL({ todos: JSON.stringify(newTodos) }, "/update");
                }}
              >
                Delete Todo{" "}
              </button>{" "}
            </div>{" "}
          </div>
        );
      })}{" "}
    </div>
  );
}
