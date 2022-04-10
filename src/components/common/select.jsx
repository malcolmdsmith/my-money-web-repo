import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Select = ({
  name,
  label,
  options,
  valueProperty,
  textProperty,
  icon,
  iconColor,
  className,
  selectClassName = "form-control",
  error,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label className={className} htmlFor={name}>
        <FontAwesomeIcon icon={icon} color={iconColor} />
        &nbsp;{label}
      </label>
      <select name={name} id={name} {...rest} className={selectClassName}>
        <option value="" />
        {options.map((option) => (
          <option key={option[valueProperty]} value={option[valueProperty]}>
            {option[textProperty]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
