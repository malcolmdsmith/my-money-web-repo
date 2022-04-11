import React from "react";
import Joi from "joi-browser";

import {
  searchTransactions,
  getLastTransactionDate,
} from "../services/bankTransactionsService";
import { getCategoryTotals } from "../utility/dataFunctions";
import FormState from "./common/formstate";
import Heading from "./common/heading";
import TransactionSummary from "./TransactionSummary";
import { getToday, incrementPeriod } from "../utility/dateFunctions";
import { formatDate } from "../utility/formatting";
import { saveItem, getItem } from "../utility/storage";

// import Button from "./common/button";
// import { migrateBankTransactions } from "../services/dataMigration";

class Dashboard extends FormState {
  state = {
    data: {
      startDate: getToday().dateFrom,
      numWeeksToShow: 2,
    },
    dateFrom: getToday().dateFrom,
    dateTo: getToday().dateTo,
    prevNumWeeksToShow: 2,
    prevStartDate: getToday().dateFrom,
    numWeeksList: [{ weeks: 1 }, { weeks: 2 }, { weeks: 4 }, { weeks: 8 }],
    summary: { totalIncome: 0, totalExpenses: 0 },
    errors: {},
    transactionCount: 0,
    dateRange: "",
    lastTransactionDate: "",
    includeRent: false,
  };

  schema = {
    startDate: Joi.string().allow(""),
    numWeeksToShow: Joi.number(),
  };

  async componentDidMount() {
    let date = getItem("dashboard-startDate");
    if (date === null) date = getToday().dateFrom;

    const result = await getLastTransactionDate();
    let transDate = "";
    if (result) {
      console.info("result...", result);
      transDate = formatDate(result.transDate);
    }

    this.setState({
      startDate: date,
      lastTransactionDate: transDate,
    });
    const { numWeeksToShow } = this.state.data;
    const period = incrementPeriod(date, date, 0, 0, numWeeksToShow * 7 - 1);
    console.info(period);
    this.setState({ dateFrom: period.dateFrom, dateTo: period.dateTo }, () =>
      this.loadTable(0)
    );
  }

  async componentDidUpdate({ prevState }) {
    if (this.state !== prevState) {
      const { startDate, numWeeksToShow } = this.state.data;
      const { prevNumWeeksToShow, prevStartDate } = this.state;
      //console.info("DiUpdate...", startDate, numWeeksToShow);
      if (
        numWeeksToShow !== prevNumWeeksToShow ||
        startDate !== prevStartDate
      ) {
        await this.loadTable(0);
      }
    }
  }

  loadTable = async (increment, includeRent) => {
    const { numWeeksToShow, startDate } = this.state.data;
    const { dateFrom, dateTo, prevNumWeeksToShow, prevStartDate } = this.state;
    let period;

    if (numWeeksToShow !== prevNumWeeksToShow || startDate !== prevStartDate) {
      period = incrementPeriod(
        startDate,
        startDate,
        0,
        0,
        numWeeksToShow * 7 - 1
      );
      this.setState({
        prevNumWeeksToShow: numWeeksToShow,
        prevStartDate: startDate,
      });
      console.info(period);
    } else {
      //console.info(dateFrom, dateTo);
      period = incrementPeriod(
        dateFrom,
        dateTo,
        increment,
        0,
        numWeeksToShow * 7 - 1
      );
    }

    // console.info(period);

    const searchResult = await searchTransactions(
      1,
      1000000,
      this.getSearchData(period.dateFrom, period.dateTo),
      false
    );
    //console.info(searchResult.totalCount);
    if (searchResult.totalCount > 0) {
      console.info("incrent..", this.state.includeRent);
      const summary = getCategoryTotals(
        searchResult.transactions,
        this.state.includeRent
      );
      // console.info(summary);
      this.setState({
        transactionCount: searchResult.totalCount,
        summary: summary,
        message: "",
        dateFrom: period.dateFrom,
        dateTo: period.dateTo,
        dateRange: "  " + period.dateFrom + " to " + period.dateTo,
      });
      //console.info("count..", searchResult.totalCount, summary);
    } else {
      //console.info("Else");
      this.setState({
        transactionCount: 0,
        summary: { totalIncome: 0, totalExpenses: 0 },
        dateFrom: period.dateFrom,
        dateTo: period.dateTo,
        dateRange: "  " + period.dateFrom + " to " + period.dateTo,
      });
    }
  };

  getSearchData = (dateFrom, dateTo) => {
    const data = {
      dateFrom: dateFrom,
      dateTo: dateTo,
      category: "",
      amountFrom: 0,
      amountTo: 0,
      keywords: "",
    };
    return data;
  };

  doSubmit = () => {
    saveItem("dashboard-startDate", this.state.startDate);
  };

  handlePrevious = async () => {
    const { currentPeriod } = this.state;
    const period = currentPeriod - 1;
    this.setState({ currentPeriod: period });
    await this.loadTable(-1, this.state.includeRent);
  };

  handleNext = async () => {
    const { currentPeriod } = this.state;
    const period = currentPeriod + 1;
    this.setState({ currentPeriod: period });
    await this.loadTable(1, this.state.includeRent);
  };

  handleChangeRent = async (input) => {
    //console.info("Checked...", input.target.checked);
    this.setState({ includeRent: input.target.checked });
    await this.loadTable(0, input.target.checked);
  };

  render() {
    const { numWeeksList, summary, dateRange, lastTransactionDate } =
      this.state;
    // console.info(transactionCount, summary);

    return (
      <div className="page-container">
        {/* <Button
          title="Migrate"
          onPress={() => migrateBankTransactions()}
          className="button primary"
        /> */}
        <h5 style={{ textAlign: "right" }}>
          Last transaction imported: {lastTransactionDate}
        </h5>
        <Heading title="Dashboard" />
        <form
          onSubmit={this.handleSubmit}
          className="horizontal-align-bottom dashboard-form box-shadow"
        >
          <div style={{ width: "120px" }}>
            {this.renderDate(
              "startDate",
              "Date",
              "calendar-alt",
              "blue",
              "datefield"
            )}
          </div>
          {this.renderSelect(
            "numWeeksToShow",
            "Weeks",
            numWeeksList,
            "weeks",
            "weeks",
            "clipboard-list"
          )}
          <div className="horizontal-align-bottom spacer">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <label for="includeRent">Show Rent</label>&nbsp;
              <input
                type="checkbox"
                name="includeRent"
                id="includeRent"
                onChange={this.handleChangeRent}
              />
            </div>
            &nbsp;&nbsp;
            {this.renderButton(
              "",
              "backward",
              "button primary dashboard-btn",
              false,
              this.handlePrevious
            )}
            {this.renderButton(
              "",
              "forward",
              "button primary dashboard-btn",
              false,
              this.handleNext
            )}
          </div>
        </form>

        <div>
          <TransactionSummary summary={summary} dateRange={dateRange} />
        </div>
      </div>
    );
  }
}
export default Dashboard;
