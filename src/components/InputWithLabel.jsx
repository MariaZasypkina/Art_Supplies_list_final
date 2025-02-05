import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./InputWithLabel.module.css";

function InputWithLabel({ todoTitle, handleTitleChange, children }) {
  const inputRef = useRef();

  // Auto-focus on the input field when the component renders
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <label htmlFor="todoTitle">{children}</label>
      <input
        id="todoTitle"
        type="text"
        value={todoTitle}
        onChange={handleTitleChange}
        ref={inputRef} // Attach ref to input
        className={styles.input}
      />
      <br></br><br></br>
    </div>
  );
}

// Define prop types
InputWithLabel.propTypes = {
  todoTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default InputWithLabel;
