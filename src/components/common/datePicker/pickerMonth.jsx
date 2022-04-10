import React, { useEffect, useState } from "react";

import Button from "../../common/button";
import PickerDay from "./pickerDay";
import { getMonthDays, getMonthFullName } from "./helper";
import "./datePicker.css";
import { getDate } from "../../../utility/dateFunctions";

const PickerMonth = ({ onMonthChange, selected, onDaySelected }) => {
  const [days, setDays] = useState([]);

  useEffect(() => {}, [selected]);

  const getMonthDescription = () => {
    //console.info(selected);
    return getMonthFullName(getDate(selected));
  };

  const getDays = () => {
    //console.info("getDays.....", selected);
    const days = getMonthDays(getDate(selected));
    return days;
    //setDays(days);
  };

  const handleDaySelected = (dayCell) => {
    //console.info("dayCell...", dayCell);
    let newdays = [...days];
    for (let i = 0; i < newdays.length; i++) {
      if (
        newdays[i].currentMonth === dayCell.currentMonth &&
        newdays[i].day === dayCell.day
      )
        newdays[i].selected = true;
      else newdays[i].selected = false;
    }
    setDays(newdays);
    onDaySelected(dayCell);
  };

  return (
    <div className="pickerContainer">
      <div className="pickerMonthHeading">
        <div className="pickerNavButton">
          <Button
            title=""
            icon="backward"
            color="white"
            className="navButton green"
            onPress={() => onMonthChange(-1)}
          />
        </div>
        <div className="monthHeading">{getMonthDescription()}</div>
        <div className="pickerNavButton">
          <Button
            title=""
            icon="forward"
            color="white"
            className="navButton green"
            onPress={() => onMonthChange(1)}
          />
        </div>
      </div>
      <div className="horizontal-align">
        <div className="dayCellHeading">M</div>
        <div className="dayCellHeading">T</div>
        <div className="dayCellHeading">W</div>
        <div className="dayCellHeading">T</div>
        <div className="dayCellHeading">F</div>
        <div className="dayCellHeading">S</div>
        <div className="dayCellHeading">S</div>
      </div>
      <div className="daysContainer">
        {getDays().map((item, i) => (
          <PickerDay key={i} item={item} onDaySelected={handleDaySelected} />
        ))}
      </div>
    </div>
  );
};
export default PickerMonth;
