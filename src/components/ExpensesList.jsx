import React from "react";

import IncomeExpenseList from "./IncomeExpenseList";
import { chunkify } from "../utility/chunkify";

const ExpensesList = ({ total, listdata }) => {
  const getChunks = () => {
    if (listdata === undefined) return [];
    return chunkify(listdata, 3, true);
  };

  return (
    <div>
      <div>Total Expenses: {total}</div>
      {total === 0 ? (
        <div>No activity found for period.</div>
      ) : (
        <div className="horizontal-align-top">
          {getChunks().map((chunk, k) => (
            <IncomeExpenseList
              totalType="Expenses"
              total={total}
              listdata={chunk}
              formattedTotalField="totalDebitFormatted"
              showTotal={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default ExpensesList;
