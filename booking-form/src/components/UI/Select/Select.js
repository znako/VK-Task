import React from "react";
import classes from "./Select.module.css";

export default function Select(props) {
  return (
    <div className={classes.Select}>
      <label htmlFor={props.label}>{props.label}</label>
      <select
        id={props.label}
        value={props.value}
        onChange={props.onChange}
        autoFocus={props.autoFocus}
      >
        <option disabled value="DEFAULT"></option>
        {props.options.map((option) => {
          return (
            <option value={option} key={option + "-" + Math.random()}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}
