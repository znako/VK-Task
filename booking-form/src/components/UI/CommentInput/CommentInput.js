import React from "react";
import classes from "./CommentInput.module.css";

export default function CommentInput(props) {
  return (
    <div className={classes.CommentInput}>
      <label htmlFor="comment">Комментарий</label>
      <textarea
        id="comment"
        placeholder="Введите комментарий..."
        rows="10"
        onChange={props.onChange}
        value={props.value}
      ></textarea>
    </div>
  );
}
