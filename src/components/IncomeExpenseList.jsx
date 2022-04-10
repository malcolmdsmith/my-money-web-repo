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
            <div>
              Total {totalType}: {total}
            </div>
            <div>No activity found for period.</div>
          </div>
        );
      else
        return (
          <div>
            Total {totalType}: {total}
          </div>
        );
    }
  };

  return (
    <div>
      {getTotalDescrpiption()}
      {parseInt(total) > 0 ? (
        <div>
          <table className="mymoney-table">
            <thead>
              <tr>
                <th>{totalType}</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {listdata.map((data, i) => (
                <tr>
                  <td width="130px">{data.category}</td>
                  <td>{data[formattedTotalField]}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : null}
    </div>
  );
};
export default IncomeExpenseList;
