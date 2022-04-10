import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import mymoney from "../../images/Originalmycentered.png";
import { getCurrentUser, logout } from "../../services/authService";
//import dollarsigns from "../../images/dollarsigns.jpeg";
import Button from "./button";
import GetDate from "./getDate";

const getMenuItems = () => {
  const user = getCurrentUser();
  let items = [];
  if (user.role === "guest") {
    items = [
      { name: "Sign In", route: "/login" },
      { name: "Sign Up", route: "/register" },
    ];
  } else {
    items = [
      { name: user.firstName, route: "/profile" },
      { name: "Sign Out", route: "/signout" },
    ];
    if (user.role === "admin") {
      items.push({ name: "Register", route: "/register" });
    }
  }
  return items;
};

const AppHeader = () => {
  const [appItems] = useState([
    { name: "Home", route: "/" },
    { name: "Import Transactions", route: "/import" },
    { name: "Budget Types", route: "/budgetTypes" },
    { name: "Transaction Rules", route: "/transactionRules" },
    { name: "Allocate Transactions", route: "/allocate" },
    { name: "Search Transactions", route: "/search" },
  ]);
  const [authItems, setAuthItems] = useState([]);

  let history = useHistory();

  useEffect(() => {
    const loadAuthMenu = () => {
      let items = getMenuItems();
      setAuthItems(items);
    };

    loadAuthMenu();
  }, []);

  const handleSelection = (item) => {
    if (item.route === "/signout") {
      logout();
      let items = getMenuItems();
      setAuthItems(items);
      history.push("/login");
      return;
    }
    history.push(item.route);
  };

  return (
    <>
      <div className="app-header-stripe"></div>
      <div className="horizontal-align">
        <img
          src={mymoney}
          alt="mymoney.jpg"
          style={{ height: "100px", margin: "5px" }}
        />
        {/* <img
          src={dollarsigns}
          alt="dollarsigns.jpeg"
          style={{ width: "100%", height: "100px", opacity: "0.6" }}
        />
        <img
          src={dollarsigns}
          alt="dollarsigns.jpeg"
          style={{ width: "100%", height: "100px", opacity: "0.6" }}
        /> */}
        <div className="slogan-container">
          <div className="slogan">
            "Are you in charge of your money? Keep track of your spending!"
          </div>
          <div>
            <GetDate />
          </div>
        </div>
      </div>
      <div className="App-header">
        <div className="horizontal-align">
          {appItems.map((item, i) => (
            <Fragment key={i}>
              <Button
                title={item.name}
                className="link"
                onPress={() => handleSelection(item)}
              />
              &nbsp;|&nbsp;
            </Fragment>
          ))}
        </div>
        <div className="horizontal-align">
          {authItems.map((item, i) => (
            <Fragment key={i}>
              <Button
                title={item.name}
                className="link"
                onPress={() => handleSelection(item)}
              />
              &nbsp;|&nbsp;
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
export default AppHeader;
