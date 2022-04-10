import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import "./App.css";

import TransactionLoader from "./components/TransactionLoader";
import TransactionMapper from "./components/TransactionMapper";
import BudgetTypesManager from "./components/BudgetTypesManager";
import TransactionRuleManager from "./components/TransactionRulesManager";
import TransactionAllocator from "./components/TransactionAllocator";
import AllocationSummary from "./components/AllocationSummary";
import AppHeader from "./components/common/appHeader";
import TransactionSearch from "./components/TransactionSearch";
//import { login } from "./services/authService";
import Login from "./components/common/login";
import ProfileCard from "./components/common/profile";
import Registration from "./components/common/registration";
//import SimpleBarChart from "./components/TestChart";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  async componentDidMount() {
    //await login("malcolms65@gmail.com", "123456");
  }

  render() {
    return (
      <>
        <div
          style={{
            margin: "auto",
            backgroundColor: "white",
            width: "1000px",
            border: "1px solid gray",
          }}
        >
          <AppHeader />
          <div className="App">
            <div className="App-content">
              <main className="main">
                <Switch>
                  <ProtectedRoute path="/" exact>
                    <Redirect to="/dashboard" component={Dashboard} />
                  </ProtectedRoute>
                  <ProtectedRoute
                    path="/dashboard"
                    component={Dashboard}
                    exact={true}
                  />
                  <ProtectedRoute
                    path="/import"
                    component={TransactionMapper}
                    exact={true}
                  />
                  <Route path="/login" component={Login} exact={true} />
                  <ProtectedRoute
                    path="/profile"
                    component={ProfileCard}
                    exact={true}
                  />
                  <Route
                    path="/register"
                    component={Registration}
                    exact={true}
                  />
                  <ProtectedRoute
                    path="/load"
                    component={TransactionLoader}
                    exact={true}
                  />
                  <ProtectedRoute
                    path="/budgetTypes"
                    component={BudgetTypesManager}
                    exact={true}
                  />
                  <ProtectedRoute
                    path="/transactionRules"
                    component={TransactionRuleManager}
                    exact={true}
                  />
                  <ProtectedRoute
                    path="/allocate"
                    component={TransactionAllocator}
                    exact={true}
                  />
                  <ProtectedRoute
                    path="/search"
                    component={TransactionSearch}
                    exact={true}
                  />
                  <ProtectedRoute
                    path="/summary"
                    component={AllocationSummary}
                    exact={true}
                  />
                </Switch>
              </main>
            </div>
          </div>
          <div className="app-header-stripe"></div>
        </div>
      </>
    );
  }
}

export default withRouter(App);
