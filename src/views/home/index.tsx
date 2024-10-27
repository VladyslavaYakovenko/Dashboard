import InfoCard from "../../components/info-card";
import Layout from "../../components/layout";
import styles from "./styles.module.scss";

import Sales from "../../../public/banknote.svg";
import Qutes from "../../../public/document-page.svg";
import Orders from "../../../public/database.svg";
import Products from "../../../public/cube.svg";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CustomerRating,
  ProfileInfo,
  totalChargeAndProfitGraphData,
  visitorGraphData,
  WebsiteTraffic,
  weeklySalesAndExpenseGraphData,
} from "../../core/types";
import { useEffect, useRef, useState } from "react";

import VoteTable from "../../components/vote-table";
import IconButton from "../../components/common/icon-button";
import ProfileCard from "../../components/profile-card";

const renderSalesIcon = (): JSX.Element => <Sales />;
const renderQutesIcon = (): JSX.Element => <Qutes />;
const renderOrdersIcon = (): JSX.Element => <Orders />;
const renderProductsIcon = (): JSX.Element => <Products />;

interface Props {
  totalSales: number;
  newQuote: number;
  orders: number;
  products: number;
  visitorsGraph: visitorGraphData[];
  weeklySalesAndExpense: weeklySalesAndExpenseGraphData[];
  totalChargeAndProfit: totalChargeAndProfitGraphData[];
  customerRatings: CustomerRating;
  votes: number;
  websiteTraffic: WebsiteTraffic[];
  pieText: string;
  profileInfo: ProfileInfo;
}

const colors = {
  bounce: "var(--color-purple)",
  visitors: "var(--color-yellow)",
  registered: "var(--color-blue)",
};

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,

    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
  } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={-(outerRadius - innerRadius) / 2}
        textAnchor="middle"
        fill={fill}
      >
        {[...payload.name[0].toUpperCase(), ...payload.name.slice(1)].join("")}
      </text>
      <text
        x={cx}
        y={cy}
        dy={(outerRadius - innerRadius) / 2}
        textAnchor="middle"
      >
        {payload.value}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 5}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const HomeView: React.FC<Props> = ({
  totalSales,
  newQuote,
  orders,
  products,
  visitorsGraph,
  weeklySalesAndExpense,
  totalChargeAndProfit,
  customerRatings,
  votes,
  websiteTraffic,
  pieText,
  profileInfo,
}) => {
  const formattedVisitorsGraph = visitorsGraph.map((visitor) => ({
    name: visitor.name,
    value: visitor.value / 1000,
  }));

  const smallGraphTopMargin = 50;

  const smallGraph1 = useRef<HTMLDivElement>(null);
  const smallGraph2 = useRef<HTMLDivElement>(null);

  const [smallGraph1Width, setSmallGraph1Width] = useState(0);
  const [smallGraph2Width, setSmallGraph2Width] = useState(0);

  const [activePiePart, setActivePiePart] = useState(0);

  const handlePieEnter = (_: any, index: number) => setActivePiePart(index);

  useEffect(() => {
    if (smallGraph1.current) {
      setSmallGraph1Width(smallGraph1.current.offsetWidth);
    }

    if (smallGraph2.current) {
      setSmallGraph2Width(smallGraph2.current.offsetWidth);
    }
  }, [smallGraph1, smallGraph2]);

  const activeDot = {
    r: 8,
  };

  return (
    <Layout>
      <div className={styles.home}>
        <InfoCard
          title="Total Sales"
          renderIcon={renderSalesIcon}
          amount={totalSales}
          color="orange"
        />
        <InfoCard
          title="New Quote"
          renderIcon={renderQutesIcon}
          amount={newQuote}
          color="blue"
        />
        <InfoCard
          title="Orders"
          renderIcon={renderOrdersIcon}
          amount={orders}
          color="purple"
        />
        <InfoCard
          title="Products"
          renderIcon={renderProductsIcon}
          amount={products}
          color="green"
        />
        <div className={styles["visitors-graph"]}>
          <h3>Product Visitors</h3>
          <ResponsiveContainer
            className={styles["graph-container"]}
            width="100%"
            height={415}
          >
            <AreaChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
              data={formattedVisitorsGraph}
            >
              <CartesianGrid strokeDasharray={"7"} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                dy={20}
                style={{
                  fontSize: "16px",
                  color: "var(--color-graph-text)",
                }}
              />
              <YAxis
                tickCount={visitorsGraph.length}
                domain={[0, 70]}
                tickLine={false}
                ticks={[10, 20, 30, 40, 50, 60, 70]}
                unit="k"
                axisLine={false}
                dx={-20}
                style={{
                  fontSize: "16px",
                  color: "var(--color-graph-text)",
                }}
              />

              <Area
                type="monotone"
                dataKey={"value"}
                fill="#4CB5FF"
                stroke="var(--color-blue)"
                fillOpacity={0.85}
                activeDot={activeDot}
              />
              <Tooltip content={<div />} />
              <Legend
                verticalAlign="top"
                wrapperStyle={{
                  textAlign: "right",
                  top: "-35px",
                  color: "var(--color-graph-text)",
                }}
                content={(_props) => {
                  return (
                    <div className={styles["legend-container"]}>
                      <span>Visitors</span>
                    </div>
                  );
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className={styles["small-left-graphs"]}>
          <div ref={smallGraph1} className={styles["small-chart"]}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                margin={{
                  top: smallGraphTopMargin,
                }}
                data={weeklySalesAndExpense}
              >
                {smallGraph1Width && (
                  <text
                    x={smallGraph1Width / 2}
                    y={25}
                    fill="var(--color-graph-text)"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    <tspan fontSize="14">Weekly Sales & Expense</tspan>
                  </text>
                )}
                <Area
                  dataKey="sales"
                  type="monotone"
                  fill="#E7E0F4"
                  stroke="none"
                  activeDot={activeDot}
                />
                <Area
                  dataKey="expense"
                  type="monotone"
                  fill="#B198DC"
                  stroke="none"
                  activeDot={{
                    ...activeDot,
                  }}
                />
                <Tooltip content={<div />} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div ref={smallGraph2} className={styles["small-chart"]}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                margin={{
                  top: smallGraphTopMargin,
                }}
                data={totalChargeAndProfit}
              >
                {smallGraph2Width && (
                  <text
                    x={smallGraph2Width / 2}
                    y={25}
                    fill="var(--color-graph-text)"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    <tspan fontSize="14">Total Charge & Profit</tspan>
                  </text>
                )}
                <Area
                  dataKey="charge"
                  type="monotone"
                  fill="#CDEDEA"
                  stroke="none"
                  activeDot={activeDot}
                />
                <Area
                  dataKey="profit"
                  type="monotone"
                  fill="#6DC7BE"
                  stroke="none"
                  activeDot={activeDot}
                />
                <Tooltip content={<div />} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className={styles["pie-container"]}>
          <div className={styles["pie-head"]}>
            <h3>Website Traffic</h3>
            <IconButton icon="refresh" />
          </div>
          <ResponsiveContainer
            className={styles["pie-wrapper"]}
            width={370}
            height={230}
          >
            <PieChart width={230} height={230} className={styles["pie-chart"]}>
              <Pie
                data={websiteTraffic}
                dataKey="value"
                activeIndex={activePiePart}
                onMouseEnter={handlePieEnter}
                activeShape={renderActiveShape}
                innerRadius="65%"
                outerRadius="100%"
              >
                {websiteTraffic.map((entry, index) => (
                  <Cell key={index} fill={colors[entry.name]} />
                ))}
              </Pie>
              <Legend align="right" verticalAlign="middle" layout="vertical" />
            </PieChart>
          </ResponsiveContainer>
          <p>{pieText}</p>
        </div>
        <ProfileCard data={profileInfo} />
        <VoteTable
          className={styles.table}
          votes={votes}
          customerRatings={customerRatings}
        />
      </div>
    </Layout>
  );
};

export default HomeView;
