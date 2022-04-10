import React, { useEffect, useState } from "react";

import Button from "./button";
import DatePicker from "./datePicker/datePicker";

const DateInput = ({
  name,
  label,
  error,
  icon,
  iconColor,
  className,
  value,
  onChange,
  onSelectedDate,
  ...rest
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selected, setSelected] = useState(value);
  //const [pickerOpenInProgress, setPickerOpenInProgress] = useState(false);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleDateChange = (dayCell) => {
    setSelected(dayCell.date);
    onSelectedDate(name, dayCell);
    setShowPicker(false);
  };

  const handleButtonPress = () => {
    // if (pickerOpenInProgress) return;

    //setPickerOpenInProgress(true);
    setShowPicker(!showPicker);
  };

  return (
    <div className="form-group">
      <DatePicker
        selected={selected}
        onDaySelected={handleDateChange}
        showPicker={showPicker}
      />
      <div>
        <Button
          title={label}
          icon={icon}
          color={iconColor}
          className="button-link"
          onPress={handleButtonPress}
        />
      </div>
      <input
        {...rest}
        name={name}
        id={name}
        value={value}
        className={"form-control " + className}
        onChange={onChange}
        autoFocus
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default DateInput;
