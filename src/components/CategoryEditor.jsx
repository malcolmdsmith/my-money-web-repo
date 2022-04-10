import React from "react";
import Joi from "joi-browser";

import FormState from "./common/formstate";
import Button from "./common/button";
import { getBudgetTypes } from "../services/budgetTypesService";
import { getCurrentUser } from "../services/authService";
import { saveTransaction } from "../services/bankTransactionsService";

export default class CategoryEditor extends FormState {
  state = {
    data: {
      myBudgetCategory: "",
    },
    errors: {},
    types: [],
  };

  schema = {
    myBudgetCategory: Joi.string().required().max(100).label("Category"),
  };

  async componentDidMount() {
    this.loadTypes();
    this.loadEditor();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.loadEditor();
  }

  loadTypes = async () => {
    const user = getCurrentUser();
    const types = await getBudgetTypes(user.id);
    this.setState({ types });
  };

  loadEditor() {
    const data = {
      myBudgetCategory: this.props.item.myBudgetCategory,
    };
    this.setState({ data });
  }

  doSubmit = async () => {
    const { data } = this.state;

    let transaction = { ...this.props.item };
    transaction.myBudgetCategory = data.myBudgetCategory;
    await saveTransaction(transaction);
    this.props.onUpdate(true);
  };

  handleCancel = () => {
    this.props.onUpdate(false);
  };

  render() {
    const { types } = this.state;

    return (
      <>
        <div id="budgetTypesEditor">
          <form
            id="myform"
            onSubmit={this.handleSubmit}
            style={{ width: "100%" }}
          >
            <div style={{ textAlign: "left", marginBottom: "20px" }}>
              {this.renderSelect(
                "myBudgetCategory",
                "Category",
                types,
                "category",
                "category",
                "list",
                "black",
                "blacklabel"
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {this.renderButton("Save", "save", "button primary", false)}
              <Button
                title="Cancel"
                icon="window-close"
                color="white"
                onPress={this.handleCancel}
                className="button primary"
              />
            </div>
          </form>
        </div>
      </>
    );
  }
}
