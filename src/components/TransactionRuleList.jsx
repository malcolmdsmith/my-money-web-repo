import React, { useState, useEffect } from "react";

import Button from "./common/button";
import { splitArray } from "../utility/chunkify";
import { currencyFormat } from "../utility/currency";

const TransactionRuleList = ({ rules, onDelete, onEdit }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = () => {
      const size = Math.ceil(rules.length / 2);
      const chunks = splitArray(rules, size);
      setItems(chunks);
    };
    loadItems();
  }, [rules]);

  const formatAmount = (amt) => {
    if (parseFloat(amt) === 0) return "N/A";
    return amt;
  };

  return (
    <div className="horizontal-align-top">
      {items.map((item, k) => (
        <table className="mymoney-table" key={k}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Search Keywords</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {item.map((subitem, i) => (
              <tr key={i}>
                <td className="data">{subitem.category}</td>
                <td className="data-small" width={220}>
                  {subitem.search_keywords}
                </td>
                <td className="data" width="40px" align="center">
                  {formatAmount(currencyFormat(subitem.amount, false))}
                </td>
                <td className="buttons">
                  <div className="horizontal-align">
                    <Button
                      title=""
                      icon="trash-alt"
                      onPress={() => {
                        if (
                          window.confirm(
                            "Are you sure you wish to delete '" +
                              subitem.category +
                              "'?"
                          )
                        )
                          onDelete(subitem);
                      }}
                    />
                    &nbsp;&nbsp;
                    <Button icon="pencil-alt" onPress={() => onEdit(subitem)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4"></td>
            </tr>
          </tfoot>
        </table>
      ))}
    </div>
  );
};
export default TransactionRuleList;
