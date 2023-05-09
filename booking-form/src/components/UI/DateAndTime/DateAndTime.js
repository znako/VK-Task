import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import React from "react";

export default function DateAndTime(props) {
  const sxStylesLabel = {
    "& .MuiTypography-root": {
      fontSize: "1rem",
    },
  };
  const sxStylesComponents = {
    "& .MuiInputBase-input": {
      color: "white",
      fontSize: "11pt",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(118, 118, 118)",
    },
    "& .MuiButtonBase-root": {
      color: "white",
    },
  };
  return (
    <div>
      <DemoContainer
        components={["DateField", "MultiInputTimeRangeField"]}
        sx={sxStylesLabel}
      >
        <DemoItem label="Дата бронирования">
          <DatePicker
            value={props.date}
            onChange={(newValue) => props.onChangeDate(newValue)}
            sx={sxStylesComponents}
          />
        </DemoItem>
        <DemoItem
          label="Время бронирования"
          component="MultiInputTimeRangeField"
        >
          <MultiInputTimeRangeField
            value={props.time}
            onChange={(newValue) => {
              props.onChangeTime(newValue);
            }}
            sx={sxStylesComponents}
          />
        </DemoItem>
      </DemoContainer>
    </div>
  );
}
