import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({
  title,
  icon,
  onPress,
  className,
  color = "blue",
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

  return (
    <div
      className={touched ? className + " touched" : className}
      onMouseDown={toggleTouched}
      onMouseUp={handleMouseUp}
      onClick={onPress}
      width={width}
    >
      {icon && <FontAwesomeIcon icon={icon} color={color} />}
      {title === "" ? null : <>&nbsp;{title}</>}
    </div>
  );
};
export default Button;
