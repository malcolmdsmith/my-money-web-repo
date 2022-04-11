import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({
  onPress,
  className,
  title = "",
  icon = "",
  color = "white",
  width = "100%",
}) => {
  const [touched, setTouched] = useState(false);

  const toggleTouched = () => {
    setTouched({ touched: !touched });
  };
  const handleMouseUp = () => {
    setTimeout(() => {
      setTouched(false);
    }, 80);
  };

  const getButton = () => {
    if (title === "" && icon === "") return "ERROR#!";
    if (title === "" && icon !== "") {
      return (
        <>
          <FontAwesomeIcon icon={icon} color={color} />
        </>
      );
    } else if (title !== "" && icon !== "") {
      return (
        <>
          <FontAwesomeIcon icon={icon} color={color} />
          &nbsp; {title}
        </>
      );
    } else return title;
  };

  return (
    <div
      className={touched ? className + " touched" : className}
      onMouseDown={toggleTouched}
      onMouseUp={handleMouseUp}
      onClick={onPress}
      width={width}
    >
      {/* {icon && <FontAwesomeIcon icon={icon} color={color} />}
      {title === "" ? null : <>&nbsp;{title}</>} */}
      {getButton()}
    </div>
  );
};
export default Button;
