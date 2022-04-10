import React from "react";
import Joi from "joi-browser";
//import { withRouter } from "react-router-dom";

import FormState from "../components/common/formstate";
import Heading from "./common/heading";

class TransactionMapper extends FormState {
  state = {
    data: {
      transDate: "",
      narrative: "",
      debitAmount: 0,
      creditAmount: 0,
      balance: 0,
      transType: "",
    },
    fields: [],
    errors: {},
    csvFile: "",
  };

  schema = {
    transDate: Joi.string().label("Transaction Date").required(),
    narrative: Joi.string().label("Description").required(),
    transType: Joi.string().label("Transaction Type").optional().allow(""),
    debitAmount: Joi.string().label("Debit Amount").required(),
    creditAmount: Joi.string().label("Credit Amount").required(),
    balance: Joi.string().label("Balance").required(),
  };

  handleLoad = (file) => {
    this.setState({ csvFile: file });
    const reader = new FileReader();

    const scope = this;
    reader.onload = function (e) {
      const text = e.target.result;
      //console.log(text);
      const headers = text.slice(0, text.indexOf("\n")).split(",");
      const fields = headers.map((field) => ({
        fieldname: field,
      }));
      scope.setState({ fields: fields });
      scope.initializeSelects(fields);
    };

    reader.readAsText(file);
  };

  initializeSelects = (fields) => {
    console.info(fields[1]);
    const data = {
      transDate: this.getFieldName(fields, "date"),
      narrative: this.getFieldName(fields, "narrative"),
      debitAmount: this.getFieldName(fields, "debit"),
      creditAmount: this.getFieldName(fields, "credit"),
      balance: this.getFieldName(fields, "balance"),
      transType: this.getFieldName(fields, "categories"),
    };
    console.info(data);
    this.setState({ data });
  };

  getFieldName(fields, tag) {
    const filter = fields.filter(
      (f) => f.fieldname.toUpperCase().indexOf(tag.toUpperCase()) >= 0
    );
    if (filter.length === 1) return filter[0].fieldname;

    return "";
  }

  doSubmit = () => {
    this.props.history.push("/load", {
      mappings: this.state.data,
      csvFile: this.state.csvFile,
    });
  };

  render() {
    const { fields } = this.state;
    return (
      <>
        <div className="page-container">
          <Heading title="Statement Mappings" />
          <div style={{ padding: "0px" }}>
            <div style={{ marginBottom: "10px" }}>
              Step 1. Browse your files to select the bank transaction file for
              the period.
            </div>
            <input
              type="file"
              accept=".csv"
              id="csvFile"
              onChange={(e) => {
                this.handleLoad(e.target.files[0]);
              }}
            />
          </div>
          <div style={{ marginTop: "20px", marginBottom: "10px" }}>
            Step 2. Map the columns in your bank transaction file to My Money
            format.
          </div>
          <form id="myform" onSubmit={this.handleSubmit}>
            <table id="mapperTable">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {this.renderSelect(
                      "transDate",
                      "Transaction Date",
                      fields,
                      "fieldname",
                      "fieldname",
                      "calendar-alt",
                      "",
                      "mappingLabels",
                      "leftlabels"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    {this.renderSelect(
                      "narrative",
                      "Description",
                      fields,
                      "fieldname",
                      "fieldname",
                      "pencil-alt",
                      "",
                      "mappingLabels",
                      "leftlabels"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    {this.renderSelect(
                      "debitAmount",
                      "Debit Amount",
                      fields,
                      "fieldname",
                      "fieldname",
                      "dollar-sign",
                      "",
                      "mappingLabels",
                      "leftlabels"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    {this.renderSelect(
                      "creditAmount",
                      "Credit Amount",
                      fields,
                      "fieldname",
                      "fieldname",
                      "dollar-sign",
                      "",
                      "mappingLabels",
                      "leftlabels"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    {this.renderSelect(
                      "balance",
                      "Balance",
                      fields,
                      "fieldname",
                      "fieldname",
                      "dollar-sign",
                      "",
                      "mappingLabels",
                      "leftlabels"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    {this.renderSelect(
                      "transType",
                      "Type",
                      fields,
                      "fieldname",
                      "fieldname",
                      "pencil-alt",
                      "",
                      "mappingLabels",
                      "leftlabels"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{ marginTop: "20px", marginBottom: "10px" }}>
              Step 3. Click Submit to accept the mapping and load your bank
              transaction file into My Money.
            </div>
            {this.renderButton("Submit", "smile", "button primary", false)}
          </form>
        </div>
      </>
    );
  }
}
export default TransactionMapper;
