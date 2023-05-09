import React, { useState, useEffect } from "react";
import Button from "../components/UI/Button/Button";
import CommentInput from "../components/UI/CommentInput/CommentInput";
import DateAndTime from "../components/UI/DateAndTime/DateAndTime";
import Select from "../components/UI/Select/Select";
import classes from "./BookingForm.module.css";
import dayjs from "dayjs";

export default function BookingForm() {
  const initialState = {
    selectTower: {
      label: "Выберите башню",
      options: ["А", "Б"],
      answer: "DEFAULT",
      id: 1,
    },
    selectFloor: {
      label: "Выберите этаж",
      options: [...new Array(25)].map((_, i) => `${i + 3}`),
      answer: "DEFAULT",
      id: 2,
    },
    selectRoom: {
      label: "Выберите переговорную",
      options: [...new Array(10)].map((_, i) => `${i + 1}`),
      answer: "DEFAULT",
      id: 3,
    },
  };
  const [selects, setSelects] = useState(initialState);
  const currentDate = dayjs();
  const [date, setDate] = useState(currentDate);
  const [time, setTime] = useState([
    currentDate,
    currentDate.add(30, "minute"),
  ]);
  const [comment, setComment] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const isSelectsValid = Object.values(selects).every(
      (select) => select.answer !== "DEFAULT"
    );
    const isDateValid = date?.isValid();
    const isTimeValid =
      time.every((value) => value?.isValid()) &&
      time[1].$d.getTime() - time[0].$d.getTime() > 0;

    setValid(isSelectsValid && isDateValid && isTimeValid);
  }, [selects, date, time]);

  const selectChangeHandler = (e, selectName) => {
    const changedSelect = { ...selects[selectName] };
    changedSelect.answer = e.target.value;
    setSelects({
      ...selects,
      [selectName]: { ...changedSelect },
    });
  };

  const renderSelect = () => {
    return Object.keys(selects).map((selectName) => {
      const select = selects[selectName];
      return (
        <React.Fragment key={select.id}>
          <Select
            label={select.label}
            options={select.options}
            value={select.answer}
            onChange={(e) => selectChangeHandler(e, selectName)}
            autoFocus={select.id === 1}
          />
        </React.Fragment>
      );
    });
  };
  const onChangeDate = (newValue) => {
    setDate(newValue);
  };
  const onChangeTime = (newValue) => {
    setTime(newValue);
  };

  const commentChangeHandler = (e) => {
    setComment(e.target.value);
  };

  const submitForm = (e) => e.preventDefault();

  const clearForm = () => {
    const currentDate = dayjs();
    setSelects(initialState);
    setDate(currentDate);
    setTime([currentDate, currentDate.add(30, "minute")]);
    setComment("");
  };

  const sendData = () => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
    };
    console.log(
      JSON.stringify({
        tower: selects.selectTower.answer,
        floor: selects.selectFloor.answer,
        room: selects.selectRoom.answer,
        date: date.$d.toLocaleDateString(),
        timeRange:
          time[0].$d.toLocaleTimeString([], options) +
          "-" +
          time[1].$d.toLocaleTimeString([], options),
        comment: comment,
      })
    );
    clearForm();
  };

  return (
    <div className={classes.BookingForm}>
      <div>
        <h1>Бронирование переговорной</h1>
        <form onSubmit={submitForm}>
          <div>{renderSelect()}</div>
          <DateAndTime
            date={date}
            time={time}
            onChangeDate={onChangeDate}
            onChangeTime={onChangeTime}
          />
          <CommentInput
            value={comment}
            onChange={(e) => commentChangeHandler(e)}
          />
          <div className={classes.Buttons}>
            <Button type="primary" disabled={!valid} onClick={sendData}>
              Отправить
            </Button>
            <Button onClick={clearForm}>Очистить</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
