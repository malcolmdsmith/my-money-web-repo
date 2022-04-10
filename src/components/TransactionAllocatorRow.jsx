import React, { Component } from "react";

import Picker from "./common/picker";
import { formatDate, zeroToEmpty } from "../utility/formatting";
import Button from "./common/button";
import TransactionRuleEditor from "./TransactionRuleEditor";
import BudgetTypeEditor from "./BudgetTypeEditor";

export default class TransactionAllocatorRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingRule: false,
      addingCategory: false,
    };
  }

  onAddRule = (item) => {
    if (this.props.editInProgress) return;
    this.props.onRuleEdit(item);
    this.setState({ addingRule: true });
  };

  onAddCategory = () => {
    if (this.props.editInProgress) return;
    this.props.onOpenBudgetTypesEditor();
    this.setState({ addingCategory: true });
  };

  onDoneRule = () => {
    this.setState({ addingRule: false });
    this.props.onCloseRuleEditor();
  };

  onDoneCategory = (closeonly) => {
    this.setState({ addingCategory: false });
    this.props.onCloseBudgetTypesEditor();
  };

  render() {
    const { addingRule, addingCategory } = this.state;
    const { item, types, rowIndex, rule, type } = this.props;
    const row = (
      <tr>
        <td align="center">{rowIndex + 1}</td>
        <td width={"100px"} align="center">
          {formatDate(item.transDate)}
        </td>
        <td width={"300px"} align="left" className="narrative">
          {item.narrative}
        </td>
        <td width={"70px"} align="center">
          {item.debitAmount}
        </td>
        <td width={"70px"} align="center">
          {zeroToEmpty(item.creditAmount)}
        </td>
        <td width={"65px"} align="center">
          {item.balance}
        </td>
        <td width={"85px"} align="center">
          <Picker
            name={"item-" + rowIndex}
            options={types}
            label="Allocate"
            valueProperty="category"
            textProperty="category"
            onChange={this.props.onChange}
            icon="list"
            value={item.myBudgetCategory}
            className="categoryPicker"
          />
        </td>
        <td width="150px">
          <Button
            title="Add Category"
            className="button secondary small"
            onPress={this.onAddCategory}
            icon="plus"
            color="white"
          />
          <Button
            title="Add Rule"
            className="button secondary small"
            onPress={() => this.onAddRule(item)}
            icon="plus"
            color="white"
          />
        </td>
      </tr>
    );
    if (!addingRule && !addingCategory) {
      return row;
    }
    return (
      <React.Fragment>
        {row}
        <tr style={{ backgroundColor: "white" }}>
          <td colSpan={10} align="right">
            {addingRule && (
              <TransactionRuleEditor
                types={types}
                rule={rule}
                onUpdate={this.onDoneRule}
                onCloseRulesEditor={this.onDoneRule}
              />
            )}
            {addingCategory && (
              <BudgetTypeEditor
                types={types}
                type={type}
                onUpdate={this.onDoneCategory}
              />
            )}
          </td>
        </tr>
      </React.Fragment>
    );
  }
}
