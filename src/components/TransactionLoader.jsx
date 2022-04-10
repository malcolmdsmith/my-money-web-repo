import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useHistory, useLocation } from "react-router-dom";

import { saveTransactions } from "../services/bankTransactionsService";
import Button from "./common/button";
import Heading from "./common/heading";

const TransactionLoader = () => {
  const [csvArray, setCsvArray] = useState([]);
  const [mappings, setMappings] = useState({});

  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    const loadFile = () => {
      setMappings(location.state.mappings);

      const reader = new FileReader();

      reader.onload = function (e) {
        const text = e.target.result;
        //console.log(text);
        processCSV(text);
      };
      //console.info(location.state.csvFile);
      reader.readAsText(location.state.csvFile);
    };

    loadFile();
  }, [location.state.mappings, location.state.csvFile]);

  const handleSave = () => {
    saveTransactions(csvArray);
    history.push("/allocate");
  };

  const processCSV = (str, delim = ",") => {
    if (str.endsWith("\n")) {
      //console.info("yep");
      str = str.substring(0, str.length - 1);
    }

    const headers = str.slice(0, str.indexOf("\n")).split(delim);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const newArray = rows.map((row) => {
      const values = row.split(delim);
      //console.info(values);
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
      return eachObject;
    });

    setCsvArray(newArray);
    //console.info(newArray);
  };

  return (
    <>
      <div className="page-container trans-list-table">
        <Heading title="Save Transactions" />
        <div style={{ width: "180px" }}>
          <Button
            title="Save Transactions"
            onPress={handleSave}
            className="button primary"
          />
        </div>
        <div>
          {csvArray.length > 0 ? (
            <>
              <table className="mymoney-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Date</th>
                    <th>Narrative</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Balance</th>
                    <th>Trans Type</th>
                  </tr>
                </thead>
                <tbody>
                  {csvArray.map((item, i) => (
                    <tr key={i}>
                      <td align="center">{i}</td>
                      <td align="center">{item[mappings.transDate]}</td>
                      <td align="left" width="490px">
                        {item[mappings.narrative]}
                      </td>
                      <td width="90px" align="center">
                        {item[mappings.debitAmount]}
                      </td>
                      <td width="90px" align="center">
                        {item[mappings.creditAmount]}
                      </td>
                      <td width="80px" align="center">
                        {item[mappings.balance]}
                      </td>
                      <td align="center">{item[mappings.transType]}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="7"></td>
                  </tr>
                </tfoot>
              </table>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default withRouter(TransactionLoader);
