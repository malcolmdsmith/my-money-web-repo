import React from "react";

import logoBall from "../../images/logoBall.png";

const Heading = ({ title }) => {
  return (
    <div className="horizontal-align heading">
      <img src={logoBall} alt="logo" style={{ height: "45px" }} />
      <div className="headingLabel">{title}</div>
    </div>
  );
};
export default Heading;
