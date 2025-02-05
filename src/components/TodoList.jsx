import React from "react";
import PropTypes from "prop-types";
import TodoListItem from "./TodoListItem";
import styles from "./TodoList.module.css";
import creativityIcon from "/images/icons/creativity.webp";

function TodoList({ todoList, onRemoveTodo }) {
  return (
  
      <ul className={styles.list}>
      {todoList.map((todo) => (
        <li key={todo.id} className={styles.listItem}>
          <img src={creativityIcon} alt="Creativity" className={styles.creativityIcon} />
        <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
      </li>
      
      ))}
      <br></br><br></br>
    </ul>
  );
}

// Define prop types
TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;
