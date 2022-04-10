import React, { useState } from "react";

const PickerDay = ({ onDaySelected, item }) => {
  const [touched, setTouched] = useState(false);

  const toggleTouched = () => {
    setTouched({ touched: !touched });
  };
  const handleMouseUp = () => {
    setTimeout(() => {
      setTouched(false);
    }, 80);
  };

  const onPress = () => {
    onDaySelected(item);
  };

  return (
    <div
      className={
        item.selected
          ? "dayCellSelected"
          : item.currentMonth
          ? touched
            ? "dayCellCurrent touched"
            : "dayCellCurrent"
          : touched
          ? "dayCellNonCurrent touched"
          : "dayCellNonCurrent"
      }
      onMouseDown={toggleTouched}
      onMouseUp={handleMouseUp}
      onClick={onPress}
    >
      {item.day}
    </div>
  );
};
export default PickerDay;
