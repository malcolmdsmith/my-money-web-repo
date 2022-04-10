import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = ({
  name,
  label,
  error,
  icon,
  iconColor,
  className,
  type,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label className={className} htmlFor={name}>
        {icon && <FontAwesomeIcon icon={icon} color={iconColor} />}&nbsp;{label}
      </label>
      <input
        type={type}
        {...rest}
        name={name}
        id={name}
        className={type !== "radio" ? "form-control " + className : "spacer"}
        //autoComplete="off"
        autoFocus
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
