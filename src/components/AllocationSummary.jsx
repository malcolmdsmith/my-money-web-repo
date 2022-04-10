import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  ResponsiveContainer,
} from "recharts";
import { useLocation } from "react-router-dom";

import Heading from "./common/heading";

const AllocationSummary = () => {
  const location = useLocation();

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

  // const CustomizedAxisTick = ({ x, y, payload }) => {
  //   //const { x, y, payload } = this.props;

  //   return (
  //     <Text
  //       x={x}
  //       y={y}
  //       width={75}
  //       angle={-35}
  //       textAnchor="end"
  //       verticalAnchor="start"
  //     >
  //       {payload.value}
  //     </Text>
  //   );
  // };

  // const renderBarChart = (
  //   <ResponsiveContainer width="100%" height={600} className="responsive">
  //     <BarChart data={location.state.data.expenses}>
  //       <CartesianGrid strokeDasharray="3 3" />
  //       <XAxis
  //         dataKey="category"
  //         interval={0}
  //         tick={<CustomizedAxisTick />}
  //         height={100}
  //       >
  //         <Label value="Expenses" offset={0} position="insideBottom" />
  //       </XAxis>
  //       <YAxis
  //         type="number"
  //         domain={[0, "dataMax + 200"]}
  //         label={{ value: "$ dollars", angle: -90, position: "insideLeft" }}
  //       />
  //       <Bar
  //         dataKey="totalDebits"
  //         barSize={30}
  //         fill="#8884d8"
  //         label={renderCustomBarLabel}
  //       />
  //     </BarChart>
  //   </ResponsiveContainer>
  // );

  const renderBarChart = (
    <ResponsiveContainer width="98%" height={650} className="responsive">
      <BarChart data={location.state.data.expenses} layout="vertical">
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
    <div style={{ marginLeft: "30px" }}>
      <Heading title={location.state.heading} />
      <div style={{ marginBottom: "20px" }}>
        For the period {location.state.data.dateRange.begin} to{" "}
        {location.state.data.dateRange.end}.
      </div>
      <table>
        <tbody>
          <tr>
            <td width="130px">Total Income:</td>
            <td>{location.state.data.totalIncome}</td>
          </tr>
          <tr>
            <td colSpan="2">
              <div style={{ marginLeft: "50px", marginBottom: "25px" }}>
                <table className="mymoney-table">
                  <thead>
                    <tr>
                      <th>Source</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  {location.state.data.income.map((credit, i) => (
                    <tr>
                      <td width="130px">{credit.category}</td>
                      <td>{credit.totalCreditFormatted}</td>
                    </tr>
                  ))}
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td>Total Expenses:</td>
            <td>{location.state.data.totalExpenses}</td>
          </tr>
        </tbody>
      </table>
      <div style={{ marginTop: "30px" }}>{renderBarChart}</div>
    </div>
  );
};
export default AllocationSummary;
