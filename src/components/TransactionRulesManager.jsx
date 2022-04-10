import React, { useState, useEffect, useRef } from "react";

import TransactionRuleEditor from "./TransactionRuleEditor";
import TransactionRuleList from "./TransactionRuleList";
import {
  deleteTransactionRule,
  getRules,
} from "../services/transactionRuleService";
import { getBudgetTypes } from "../services/budgetTypesService";
import Heading from "../components/common/heading";
import { getCurrentUser } from "../services/authService";

const TransactionRulesManager = () => {
  const [rule, setRule] = useState({
    category: "",
    search_keywords: "",
  });
  const [rules, setRules] = useState([]);
  const [types, setTypes] = useState([]);
  const user = useRef(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    user.current = currentUser;
    loadRules();
    loadTypes();
  }, []);

  const loadRules = async () => {
    const rules = await getRules(user.current.id);
    setRules(rules);
  };

  const loadTypes = async () => {
    const types = await getBudgetTypes(user.current.id);
    setTypes(types);
  };

  const handleEditorUpdate = async () => {
    await loadRules();
  };

  const handleTypeDelete = async (rule) => {
    console.info(rule);
    await deleteTransactionRule(rule.id);
    await loadRules();
  };

  const handleTypeEdit = async (rule) => {
    console.info(rule);
    setRule(rule);
  };

  return (
    <>
      <div className="page-container">
        <Heading title="Transaction Rules" />
        <div>
          <div style={{ margin: "30px" }}>
            <TransactionRuleEditor
              rule={rule}
              types={types}
              onUpdate={handleEditorUpdate}
            />
          </div>
          <TransactionRuleList
            rules={rules}
            onDelete={handleTypeDelete}
            onEdit={handleTypeEdit}
          />
        </div>
      </div>
    </>
  );
};
export default TransactionRulesManager;
