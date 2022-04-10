import React, { useState, useEffect } from "react";

import BudgetTypeEditor from "./BudgetTypeEditor";
import BudgetTypesList from "./BudgetTypesList";
import {
  getBudgetTypes,
  deleteBudgetType,
} from "../services/budgetTypesService";
import Heading from "../components/common/heading";
import { getCurrentUser } from "../services/authService";

const BudgetTypesManager = () => {
  const [type, setType] = useState({
    category: "",
    parent_category: "",
  });
  const [types, setTypes] = useState([]);

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = async () => {
    const user = getCurrentUser();
    const types = await getBudgetTypes(user.id);
    setTypes(types);
  };

  const handleEditorUpdate = async () => {
    await loadTypes();
  };

  const handleTypeDelete = async (type) => {
    console.info(type);
    await deleteBudgetType(type.id);
    await loadTypes();
  };

  const handleTypeEdit = async (type) => {
    console.info(type);
    setType(type);
  };

  return (
    <>
      <div className="page-container">
        <Heading title="Budget Types" />
        <div>
          <div style={{ margin: "30px" }}>
            <BudgetTypeEditor
              type={type}
              types={types}
              onUpdate={handleEditorUpdate}
            />
          </div>
          <BudgetTypesList
            types={types}
            onDelete={handleTypeDelete}
            onEdit={handleTypeEdit}
          />
        </div>
      </div>
    </>
  );
};
export default BudgetTypesManager;
