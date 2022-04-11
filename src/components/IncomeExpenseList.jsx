import React from "react";

const IncomeExpenseList = ({
  totalType,
  total,
  listdata,
  formattedTotalField,
  showTotal,
}) => {
  const getTotalDescrpiption = () => {
    if (showTotal) {
      if (parseInt(total) === 0)
        return (
          <div>
            <div className="bold">
              Total {totalType}: {total}
            </div>
            <hr className="hr-line" />
            <div>No activity found for period.</div>
          </div>
        );
      else
        return (
          <div>
            <div className="bold">
              Total {totalType}: {total}
            </div>
            <hr className="hr-line" />
          </div>
        );
    }
  };

  return (
    <div>
      {getTotalDescrpiption()}
      {parseInt(total) > 0 ? (
        <div>
          <table className="income-expenses-table">
            <tbody>
              {listdata.map((data, i) => (
                <tr>
                  <td width="130px">{data.category}</td>
                  <td>{data[formattedTotalField]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};
export default IncomeExpenseList;
