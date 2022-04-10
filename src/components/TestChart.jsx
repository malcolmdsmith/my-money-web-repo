import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  LabelList,
  Text,
} from "recharts";

const data = [
  { name: "Belief In Self", You: 4, "Audience Average": 2 },
  { name: "Awareness of the Needs of Others", You: 3, "Audience Average": 1 },
  { name: "Honesty", You: 2, "Audience Average": 3 },
  { name: "Ability to Self-Reflect", You: 2, "Audience Average": 3 },
  { name: "Persistence", You: 1, "Audience Average": 4 },
  {
    name: "Contentedness with Current Situation",
    You: 2,
    "Audience Average": 3,
  },
];
const CustomizedAxisTick = ({ x, y, payload }) => {
  return (
    <Text
      x={x}
      y={y}
      width={75}
      angle={-35}
      textAnchor="end"
      verticalAnchor="start"
    >
      {payload.value}
    </Text>
  );
};

const SimpleBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={600} className="responsive">
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          interval={0}
          tick={<CustomizedAxisTick />}
          height={100}
        />
        <YAxis />
        <Legend verticalAlign="top" />
        <Bar dataKey="You" fill="#7489ca">
          <LabelList dataKey="You" position="top" />
        </Bar>
        <Bar dataKey="Audience Average" fill="#666">
          <LabelList dataKey="Audience Average" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarChart;
