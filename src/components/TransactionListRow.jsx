import React, { useState } from "react";

import { formatDate } from "../utility/formatting";
import Button from "./common/button";
import CategoryEditor from "./CategoryEditor";

const TransactionListRow = ({
  item,
  index,
  editInProgress,
  onAdd,
  onUpdate,
}) => {
  const [addingCategory, setAddingCategory] = useState(false);

  const handleAddCategory = (item) => {
    if (editInProgress) return;
    setAddingCategory(true);
    onAdd();
  };

  const handleDoneCategory = (updated) => {
    setAddingCategory(false);
    onUpdate(updated);
  };

  const row = (
    <tr key={index}>
      <td align="center">{index}</td>
      <td align="center" width="100px">
        {formatDate(item.transDate)}
      </td>
      <td align="left" width="460px">
        {item.narrative}
      </td>
      <td width="90px" align="center">
        {item.debitAmount}
      </td>
      <td width="90px" align="center">
        {item.creditAmount}
      </td>
      <td width="80px" align="center">
        {item.myBudgetCategory}
      </td>
      <td align="center">{item.categories}</td>
      <td>
        <Button icon="pencil-alt" onPress={() => handleAddCategory(item)} />
      </td>
    </tr>
  );

  if (!addingCategory) {
    return row;
  }
  return (
    <React.Fragment>
      {row}
      <tr style={{ backgroundColor: "white" }}>
        <td colSpan={10} align="right">
          {addingCategory && (
            <CategoryEditor item={item} onUpdate={handleDoneCategory} />
          )}
        </td>
      </tr>
    </React.Fragment>
  );
};
export default TransactionListRow;
