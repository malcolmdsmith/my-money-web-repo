import React, { Component } from "react";
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";

import {
  getTransactionsNotCategorized,
  saveAllocatedTransactions,
} from "../services/bankTransactionsService";
import { getBudgetTypes } from "../services/budgetTypesService";
import { getRules } from "../services/transactionRuleService";
import Button from "./common/button";
import TransactionAllocatorRow from "./TransactionAllocatorRow";
import Heading from "../components/common/heading";
import { getCategoryTotals } from "../utility/dataFunctions";
import { getCurrentUser } from "../services/authService";

class TransactionAllocator extends Component {
  state = {
    user: {},
    transactions: [],
    types: [],
    rule: {
      category: "",
      search_keywords: "",
      amount: 0,
    },
    type: {
      category: "",
      parent_category: "",
    },
    allocating: false,
    allocatingMsg: "",
    editInProgress: false,
  };

  async componentDidMount() {
    const user = getCurrentUser();
    const transactions = await getTransactionsNotCategorized(user.id);
    console.info(user);
    if (!user) return;
    const types = await getBudgetTypes(user.id);
    this.setState({ transactions, types, user });
  }

  loadTypes = async () => {
    const types = await getBudgetTypes(this.state.user.id);
    this.setState({ types });
  };

  handleSelectChange = (item, value) => {
    const { transactions } = this.state;
    const index = parseInt(item.split("-")[1]);
    const trans = Object.assign({}, transactions[index], {
      myBudgetCategory: value,
    });
    // console.info("val...", transactions);
    // console.info(transactions.slice(0, index));
    // console.info(transactions.slice(index + 1));
    const added = [
      ...transactions.slice(0, index),
      trans,
      ...transactions.slice(index + 1),
    ];

    //console.info(added);
    this.setState({ transactions: added });
  };

  handleAllocate = async () => {
    const { transactions } = this.state;
    let filtered = transactions.filter(
      (trans) => trans.myBudgetCategory === ""
    );
    if (filtered.length > 0) {
      if (
        !window.confirm(
          "There are transactions that have not been allocated. Do you wish to continue? These transaction can be allocated later."
        )
      )
        return;
    }

    filtered = transactions.filter((trans) => trans.myBudgetCategory !== "");
    if (filtered.length === 0) {
      window.alert("There are no allocations to make.");
      return;
    }

    await saveAllocatedTransactions(transactions);
    const data = getCategoryTotals(transactions);
    console.info(data);
    this.props.history.push("/summary", {
      data,
      heading: "Allocation Summary",
    });
  };

  delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  handleRunRules = async () => {
    //console.info(this.state.transactions[0]);
    const { transactions } = this.state;
    if (transactions.length === 0) return;
    this.setState({
      allocating: true,
      allocatingMsg: "Scanning all transactions...",
    });
    await this.runRules(false);
    this.setState({ allocating: false });
  };

  handleRunRulesEmptyOnly = async () => {
    //console.info(this.state.transactions[0]);
    const { transactions } = this.state;
    if (transactions.length === 0) return;
    this.setState({
      allocating: true,
      allocatingMsg: "Scanning empty transactions...",
    });
    await this.delay(2000);
    await this.runRules(true);
    this.setState({ allocating: false });
  };

  runRules = async (emptyOnly) => {
    const { transactions, user } = this.state;
    const rules = await getRules(user.id);
    //console.info(rules, transactions.length);

    //If run rules all then clear any transactions with allocations.
    if (!emptyOnly) {
      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].myBudgetCategory !== "") {
          const objtrans = Object.assign({}, this.state.transactions[i], {
            myBudgetCategory: "",
          });
          //console.info(i, objtrans);
          this.setState({
            transactions: [
              ...this.state.transactions.slice(0, i),
              objtrans,
              ...this.state.transactions.slice(i + 1),
            ],
          });
        }
      }
    }

    for (let i = 0; i < transactions.length; i++) {
      let trans = transactions[i];
      if ((emptyOnly && trans.myBudgetCategory === "") || !emptyOnly) {
        //console.info(transactions[i]);
        for (let rule of rules) {
          let ruleFound = false;
          if (
            trans.narrative
              .toUpperCase()
              .indexOf(rule.search_keywords.toUpperCase()) >= 0
          ) {
            if (rule.amount > 0) {
              if (
                parseFloat(trans.debitAmount) === parseFloat(rule.amount) ||
                parseFloat(trans.creditAmount) === parseFloat(rule.amount)
              ) {
                trans.myBudgetCategory = rule.category;
                ruleFound = true;
              }
            } else {
              trans.myBudgetCategory = rule.category;
              ruleFound = true;
            }
            if (ruleFound) {
              const objtrans = Object.assign({}, this.state.transactions[i], {
                myBudgetCategory: rule.category,
              });
              this.setState({
                transactions: [
                  ...this.state.transactions.slice(0, i),
                  objtrans,
                  ...this.state.transactions.slice(i + 1),
                ],
              });
            }
          }
        }
      }
    }
  };

  handleCloseBudgetTypesEditor = async () => {
    await this.loadTypes();
    this.setState({
      editInProgress: false,
    });
  };

  handeCloseTransactionRulesEditor = () => {
    this.setState({
      editInProgress: false,
    });
  };

  handleRuleEdit = (item) => {
    const rule = {
      category: "",
      search_keywords: item.narrative,
      amount: 0,
    };
    this.setState({ rule, editInProgress: true });
  };

  handleOpenBudgetTypeEditor = () => {
    this.setState({ editInProgress: true });
  };

  render() {
    const {
      transactions,
      types,
      rule,
      type,
      allocating,
      allocatingMsg,
      editInProgress,
    } = this.state;

    console.info(transactions.length);

    return (
      <>
        <div className="page-container">
          <Heading title="Transaction Allocations" />
          <div className="horizontal-align">
            <Button
              title="Run Rules"
              className="button primary"
              onPress={this.handleRunRules}
            />
            <Button
              title="Run Rules Empty Only"
              className="button primary"
              onPress={this.handleRunRulesEmptyOnly}
            />
            <Button
              title="Allocate"
              className="button primary"
              onPress={this.handleAllocate}
            />
          </div>
          {allocating && (
            <div
              style={{ width: "100%", height: "100px", textAlign: "center" }}
            >
              <Dots size={26} />
              <div>{allocatingMsg}</div>
            </div>
          )}
          <div style={{ marginTop: "30px" }}>
            {transactions.length === 0 ? (
              <div>No transactions to Allocate. </div>
            ) : (
              <table className="mymoney-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Date</th>
                    <th>Narrative</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Balance</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((item, i) => (
                    <TransactionAllocatorRow
                      key={i}
                      rowIndex={i}
                      item={item}
                      types={types}
                      rule={rule}
                      type={type}
                      onChange={this.handleSelectChange}
                      onCloseBudgetTypesEditor={
                        this.handleCloseBudgetTypesEditor
                      }
                      onCloseRuleEditor={this.handeCloseTransactionRulesEditor}
                      onRuleEdit={this.handleRuleEdit}
                      onOpenBudgetTypesEditor={this.handleOpenBudgetTypeEditor}
                      editInProgress={editInProgress}
                    />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="8"></td>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default TransactionAllocator;
