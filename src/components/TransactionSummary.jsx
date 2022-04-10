import React from "react";

import Heading from "../components/common/heading";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  ResponsiveContainer,
} from "recharts";
import IncomeExpenseList from "./IncomeExpenseList";
import ExpensesList from "./ExpensesList";

const TransactionSummary = ({ summary }) => {
  const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    return (
      <text
        x={x + width + 25}
        y={y + 22}
        fill="#666"
        textAnchor="middle"
        dy={-6}
        fontWeight="bold"
      >{`${value}`}</text>
    );
  };

  const renderBarChart = (
    <ResponsiveContainer width="98%" height={650} className="responsive">
      <BarChart data={summary.expenses} layout="vertical">
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis
          type="number"
          domain={[0, "dataMax + 600"]}
          height={50}
          label={{ value: "($) Dollars", offset: -10, position: "bottom" }}
        />
        <YAxis
          dataKey="category"
          type="category"
          width={150}
          interval={0}
          fontSize={14}
        >
          <Label value="Expenses" angle={-90} offset={0} position="left" />
        </YAxis>
        <Bar
          dataKey="totalDebits"
          barSize={22}
          fill="#8884d8"
          label={renderCustomBarLabel}
        />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div>
      <Heading title={"Summary"} />
      <div
        className={
          summary.totalExpenses === 0
            ? "horizontal-align"
            : "horizontal-align-space"
        }
      >
        <IncomeExpenseList
          totalType="Income"
          total={summary.totalIncome}
          listdata={summary.income}
          formattedTotalField="totalCreditFormatted"
          showTotal={true}
        />
        <div style={{ width: "30px" }}></div>
        <ExpensesList
          total={summary.totalExpenses}
          listdata={summary.expenses}
        />
      </div>
      {parseInt(summary.totalExpenses) > 0 ? (
        <div style={{ marginTop: "30px" }}>{renderBarChart}</div>
      ) : null}
    </div>
  );
};
export default TransactionSummary;
