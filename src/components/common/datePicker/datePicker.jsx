import React, { useEffect, useState } from "react";

import PickerMonth from "./pickerMonth";
import { getDate, getDDMMYYYY } from "../../../utility/dateFunctions";

const DatePicker = ({ selected, showPicker, onDaySelected }) => {
  const [monthDate, setMonthDate] = useState(selected);

  useEffect(() => {
    setMonthDate(selected);
  }, [selected]);

  const handleMonthChange = (increment) => {
    //console.info(monthDate);
    const month = getDate(monthDate).getMonth() + increment;
    const date = new Date(getDate(monthDate).getFullYear(), month, 1);
    //console.info(monthDate.getMonth(), month, date);
    setMonthDate(getDDMMYYYY(date));
  };

  return (
    <div
      className={
        showPicker ? "picker-container-open" : "picker-container-close"
      }
    >
      <PickerMonth
        selected={monthDate}
        onMonthChange={handleMonthChange}
        onDaySelected={onDaySelected}
      />
    </div>
  );
};
export default DatePicker;
