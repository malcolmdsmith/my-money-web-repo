import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Picker = ({
  name,
  label,
  options,
  valueProperty,
  textProperty,
  icon,
  iconColor,
  className,
  error,
  onChange,
  optionSelected,
  ...rest
}) => {
  const handleOnChange = (event) => {
    //   // console.info(event.target.value);
    onChange(event.target.id, event.target.value);
  };

  return (
    <div className="form-group">
      <label className={className} htmlFor={name}>
        <FontAwesomeIcon icon={icon} color={iconColor} />
        &nbsp;{label}
      </label>
      <select
        name={name}
        id={name}
        {...rest}
        className="form-picker"
        onChange={handleOnChange}
      >
        <optgroup>
          <option value="" />
          {options.map((option, i) => (
            <option
              key={i}
              value={option[valueProperty]}
              selected={
                option[valueProperty] === optionSelected ? "selected" : ""
              }
              className={className}
            >
              {option[textProperty]}
            </option>
          ))}
        </optgroup>
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Picker;
