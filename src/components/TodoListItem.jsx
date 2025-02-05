import React from "react";
import PropTypes from "prop-types";
import styles from "./TodoListItem.module.css";

import trashIcon from "/images/icons/trash.jpg";

function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li className={styles.listItem}>
      <span className={styles.todoText}>{todo.title}</span>
      <button className={styles.removeButton} onClick={() => onRemoveTodo(todo.id)}>
        <img src={trashIcon} alt="Remove" className={styles.trashIcon} />
      </button>
    </li>
  );
}

// Define prop types
TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
