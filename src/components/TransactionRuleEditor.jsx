import React from "react";
import Joi from "joi-browser";

import FormState from "./common/formstate";
import { saveTransactionRule } from "../services/transactionRuleService";
import Button from "./common/button";

export default class TransactionRuleEditor extends FormState {
  state = {
    data: {
      id: 0,
      category: "",
      search_keywords: "",
      amount: 0.0,
    },
    errors: {},
  };

  schema = {
    id: Joi.number(),
    category: Joi.string().required().max(100).label("Category"),
    search_keywords: Joi.string().max(255).empty("").label("Parent Category"),
    amount: Joi.number().label("Amount"),
  };

  async componentDidMount() {
    this.loadEditor();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.rule !== this.props.rule) {
      console.info(prevProps, this.props);
      this.loadEditor();
    }
  }

  loadEditor() {
    const data = {
      id: this.props.rule.id,
      category: this.props.rule.category,
      search_keywords: this.props.rule.search_keywords,
      amount: this.props.rule.amount,
    };
    console.info(data);
    this.setState({ data });
  }

  doSubmit = async () => {
    const { data } = this.state;
    await saveTransactionRule(data);
    this.props.onUpdate();
    this.handleClear();
    if (this.props.onCloseRulesEditor) this.handleCancel();
  };

  handleClear = () => {
    const data = {
      id: 0,
      category: "",
      search_keywords: "",
      amount: 0.0,
    };
    this.setState({ data });
  };

  handleCancel = () => {
    this.props.onCloseRulesEditor();
  };

  render() {
    const { types } = this.props;

    return (
      <>
        <div id="transactionRuleEditor">
          <form
            id="myform"
            onSubmit={this.handleSubmit}
            style={{ width: "100%" }}
          >
            <div style={{ textAlign: "left", marginBottom: "20px" }}>
              {this.renderSelect(
                "category",
                "Category",
                types,
                "category",
                "category",
                "clipboard-list",
                "black",
                "blacklabel"
              )}
              {this.renderTextarea(
                "search_keywords",
                "Search Keywords",
                "pencil-alt",
                "black",
                "blacklabel",
                3,
                20
              )}
              <div style={{ width: "100px" }}>
                {this.renderInput(
                  "amount",
                  "Amount",
                  "dollar-sign",
                  "black",
                  "blacklabel"
                )}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {this.renderButton("Save", "save", "button primary", false)}
              <Button
                title="Clear"
                icon="trash-alt"
                color="white"
                onPress={this.handleClear}
                className="button primary"
              />
              {this.props.onCloseRulesEditor && (
                <Button
                  title="Cancel"
                  icon="window-close"
                  color="white"
                  onPress={this.handleCancel}
                  className="button primary"
                />
              )}
            </div>
          </form>
        </div>
      </>
    );
  }
}
