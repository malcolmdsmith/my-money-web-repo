import React from "react";
import Joi from "joi-browser";

import FormState from "./common/formstate";
import { saveBudgetType } from "../services/budgetTypesService";
import Button from "./common/button";

export default class BudgetTypeEditor extends FormState {
  state = {
    data: {
      category: "",
      parent_category: "",
    },
    errors: {},
  };

  schema = {
    category: Joi.string().required().max(100).label("Category"),
    parent_category: Joi.string().max(100).empty("").label("Parent Category"),
  };

  async componentDidMount() {
    this.loadEditor();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.loadEditor();
  }

  loadEditor() {
    const data = {
      category: this.props.type.category,
      parent_category: this.props.type.parent_category,
    };
    this.setState({ data });
  }

  doSubmit = async () => {
    const { data } = this.state;
    await saveBudgetType(data);
    this.props.onUpdate(false);
    this.handleClear();
  };

  handleClear = () => {
    const data = {
      category: "",
      parent_category: "",
    };
    this.setState({ data });
  };

  handleCancel = () => {
    this.props.onUpdate(true);
  };

  render() {
    const { types } = this.props;

    return (
      <>
        <div id="budgetTypesEditor">
          <form
            id="myform"
            onSubmit={this.handleSubmit}
            style={{ width: "100%" }}
          >
            <div style={{ textAlign: "left", marginBottom: "20px" }}>
              {this.renderInput(
                "category",
                "Category",
                "pencil-alt",
                "black",
                "blacklabel"
              )}
              {this.renderSelect(
                "parent_category",
                "Parent",
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
                title="Clear"
                icon="trash-alt"
                color="white"
                onPress={this.handleClear}
                className="button primary"
              />
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
