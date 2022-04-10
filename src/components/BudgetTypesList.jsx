import React, { useState, useEffect } from "react";

import Button from "./common/button";
import { splitArray } from "../utility/chunkify";

const BudgetTypesList = ({ types, onDelete, onEdit }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = () => {
      const size = Math.ceil(types.length / 2);
      const chunks = splitArray(types, size);
      setItems(chunks);
    };

    loadItems();
  }, [types]);

  return (
    <div className="horizontal-align-top">
      {items.map((item, k) => (
        <table className="mymoney-table" key={k}>
          <thead>
            <tr>
              <th width="170px" style={{ textAlign: "center" }}>
                Category
              </th>
              <th width="200px" style={{ textAlign: "center" }}>
                Parent Category
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {item.map((subitem, i) => (
              <tr key={i}>
                <td className="data">{subitem.category}</td>
                <td className="data">{subitem.parent_category}</td>
                <td className="buttons">
                  <div style={{ display: "flex", flexDirection: "row" }}>
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
              <td colSpan="3"></td>
            </tr>
          </tfoot>
        </table>
      ))}
    </div>
  );
};
export default BudgetTypesList;
