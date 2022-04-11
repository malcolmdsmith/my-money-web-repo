import React from "react";
import Joi from "joi-browser";

import FormState from "./common/formstate";
import Heading from "./common/heading";
import Button from "./common/button";
import Picker from "./common/picker";
import TransactionSummary from "../components/TransactionSummary";
import TransactionList from "../components/TransactionList";
import { getBudgetTypes } from "../services/budgetTypesService";
import { getCurrentUser } from "../services/authService";
import { searchTransactions } from "../services/bankTransactionsService";
import { getCategoryTotals } from "../utility/dataFunctions";
import { getToday, incrementDate } from "../utility/dateFunctions";
import { saveItem, getItem } from "../utility/storage";

class TransactionSearch extends FormState {
  state = {
    data: {
      dateFrom: getToday().dateFrom,
      dateTo: getToday().dateTo,
      category: "",
      amountFrom: 0,
      amountTo: 0,
      keywords: "",
    },
    summary: {},
    resultsFormat: "graph",
    resultsMessage: "",
    errors: {},
    categories: [],
    listResults: true,
    graphResults: false,
    transactionCount: 0,
    periodType: "",
    periods: [
      { period: "Today" },
      { period: "This Week" },
      { period: "This Fortnight" },
      { period: "This Month" },
      { period: "This Quarter" },
      { period: "This Financial Year" },
      { period: "This Calendar Year" },
    ],
  };

  schema = {
    dateFrom: Joi.string().allow(""),
    dateTo: Joi.string().allow(""),
    category: Joi.string().allow(""),
    amountFrom: Joi.number(),
    amountTo: Joi.number(),
    keywords: Joi.string().allow(""),
  };

  async componentDidMount() {
    const user = getCurrentUser();
    const categories = await getBudgetTypes(user.id);
    const dateFrom = getItem("dateFrom");
    const dateTo = getItem("dateTo");
    const data = {
      dateFrom: dateFrom ? dateFrom : getToday().dateFrom,
      dateTo: dateTo ? dateTo : getToday().dateTo,
      category: "",
      amountFrom: 0,
      amountTo: 0,
      keywords: "",
    };
    this.setState({ categories, data, periodType: "" });
  }

  async doSubmit() {
    const { data } = this.state;
    saveItem("dateFrom", data.dateFrom);
    saveItem("dateTo", data.dateTo);
    this.runSearch();
  }

  async runSearch() {
    const { data, resultsFormat } = this.state;
    let searchResult = await searchTransactions(0, 0, data, true);
    if (searchResult.totalCount === 0) {
      const message = "No transactions for search criteria found!";
      this.setState({ resultsMessage: message });
      return;
    }
    this.setState({ resultsMessage: "" });
    if (resultsFormat === "graph") {
      console.info("graph");
      searchResult = await searchTransactions(1, 1000000, data, false);
      const summary = getCategoryTotals(searchResult.transactions);
      this.setState({ summary, transactionCount: searchResult.totalCount });
      // this.props.history.push("/summary", {
      //   data: summary,
      //   heading: "Transaction Summary",
      // });
    } else {
      console.info("Else...", searchResult.totalCount);
      this.setState({
        transactionCount: searchResult.totalCount,
        // summary: summary,
      });
    }
  }

  updateDateRangeState(dateRange) {
    console.info(dateRange.dateFrom);
    this.setState((prevState) => {
      let data = Object.assign({}, prevState.data);
      data.dateFrom = dateRange.dateFrom;
      data.dateTo = dateRange.dateTo;
      return { data };
    });
  }

  handleIncrease = () => {
    this.handleIncrement(1);
  };

  handleDecrease = () => {
    this.handleIncrement(-1);
  };

  handleIncrement(value) {
    const { data, periodType } = this.state;
    const dateRange = incrementDate(
      periodType,
      data.dateFrom,
      data.dateTo,
      value
    );
    this.updateDateRangeState(dateRange);
  }

  handlePeriodTypeChange = (item, value) => {
    this.setState({ periodType: value }, function () {
      this.handleIncrement(0);
    });
  };

  handleGraphButton = () => {
    this.setState({ resultsFormat: "graph" });
  };
  handleListButton = () => {
    this.setState({ resultsFormat: "list" });
  };

  handleTransactionUpdated = async (updated) => {
    if (updated) {
      console.info("updated");
      this.runSearch();
    }
  };

  handleClearCategory = () => {
    let obj = {};
    Object.assign(obj, this.state.data);
    obj.category = "";
    this.setState({ data: obj });
  };

  handleClearAmounts = () => {
    let obj = {};
    Object.assign(obj, this.state.data);
    obj.amountFrom = "0";
    obj.amountTo = "0";
    this.setState({ data: obj });
  };

  handleClearKeywords = () => {
    let obj = {};
    Object.assign(obj, this.state.data);
    obj.keywords = "";
    this.setState({ data: obj });
  };

  getDateRange = () => {
    const { dateFrom, dateTo } = this.state.data;
    return dateFrom + " to " + dateTo;
  };

  render() {
    const {
      categories,
      transactionCount,
      periods,
      resultsMessage,
      summary,
      data,
      resultsFormat,
    } = this.state;
    return (
      <>
        <div className="verticalAlign page-container">
          <div>
            <Heading title="Transaction Search" />
            <form onSubmit={this.handleSubmit} className="search-form">
              <div className="horizontal-align-bottom">
                {this.renderDate(
                  "dateFrom",
                  "Date From",
                  "calendar-alt",
                  "blue",
                  "dateField"
                )}
                {this.renderDate(
                  "dateTo",
                  "Date To",
                  "calendar-alt",
                  "blue",
                  "dateField"
                )}
                <Button
                  icon="backward"
                  className="button primary"
                  onPress={this.handleDecrease}
                  width="100px"
                />
                <Button
                  icon="forward"
                  className="button primary"
                  onPress={this.handleIncrease}
                />
                <Picker
                  name="periodType"
                  label="Set dates to:-"
                  icon="clipboard-list"
                  options={periods}
                  valueProperty="period"
                  textProperty="period"
                  onChange={this.handlePeriodTypeChange}
                  width={140}
                  optionSelected=""
                />
              </div>
              <div
                style={{
                  width: "220px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {this.renderSelect(
                  "category",
                  "Category",
                  categories,
                  "category",
                  "category",
                  "clipboard-list",
                  "black",
                  ""
                )}
                <div style={{ marginTop: "20px" }}>
                  <Button
                    icon="window-close"
                    color="white"
                    className="button primary"
                    onPress={this.handleClearCategory}
                  />
                </div>
              </div>
              <div className="horizontal-align">
                {this.renderInput(
                  "amountFrom",
                  "Amount between",
                  "dollar-sign",
                  "black",
                  "amountField"
                )}
                {this.renderInput(
                  "amountTo",
                  "and",
                  "dollar-sign",
                  "black",
                  "amountField"
                )}
                <div style={{ marginTop: "20px" }}>
                  <Button
                    icon="window-close"
                    className="button primary"
                    onPress={this.handleClearAmounts}
                  />
                </div>
              </div>
              <div
                style={{
                  width: "288px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {this.renderInput(
                  "keywords",
                  "Description",
                  "pencil-alt",
                  "black",
                  ""
                )}
                <div style={{ marginTop: "20px" }}>
                  <Button
                    icon="window-close"
                    className="button primary"
                    onPress={this.handleClearKeywords}
                  />
                </div>
              </div>
              <div
                style={{
                  margin: "15px",
                }}
              >
                <div className="horizontal-align">
                  {this.renderButton(
                    "Graph Transactions",
                    "image",
                    "button primary",
                    false,
                    this.handleGraphButton
                  )}
                  {this.renderButton(
                    "List Transactions",
                    "list",
                    "button primary",
                    false,
                    this.handleListButton
                  )}
                </div>
              </div>
            </form>
          </div>

          {resultsMessage !== "" ? <div>{resultsMessage}</div> : null}

          <div>
            {transactionCount > 0 ? (
              <>
                {resultsFormat === "graph" ? (
                  <div style={{ marginBottom: "30px" }}>
                    <TransactionSummary
                      summary={summary}
                      dateRange={this.getDateRange()}
                    />
                  </div>
                ) : (
                  <div>
                    <TransactionList
                      searchData={data}
                      onTransactionUpdated={this.handleTransactionUpdated}
                    />
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      </>
    );
  }
}
export default TransactionSearch;
