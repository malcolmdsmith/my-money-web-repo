import React from "react";

import Button from "./button";

const PaginationPanel = ({
  onFirst,
  onPrevious,
  onNext,
  onLast,
  totalPages,
  currentPage,
  itemCount,
}) => {
  return (
    <div className="pagination-container">
      <div style={{ width: "220px", marginLeft: "10px" }}>
        {itemCount} transactions found.
      </div>
      <div className="pagination-buttons">
        <Button
          title=""
          icon="step-backward"
          color="darkBlue"
          className="button primary pagination-btn"
          onPress={onFirst}
        />
        <Button
          title=""
          icon="backward"
          color="darkBlue"
          className="button primary pagination-btn"
          onPress={onPrevious}
        />
        <Button
          title=""
          icon="forward"
          color="darkBlue"
          className="button primary pagination-btn"
          onPress={onNext}
        />
        <Button
          title=""
          icon="step-forward"
          className="button primary pagination-btn"
          color="darkBlue"
          onPress={onLast}
        />
        <span style={{ marginBottom: "5px", marginLeft: "5px" }}>
          {"(Page " + currentPage + " of " + totalPages + ")"}
        </span>
      </div>
    </div>
  );
};
export default PaginationPanel;
