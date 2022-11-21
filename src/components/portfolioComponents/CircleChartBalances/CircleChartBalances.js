// import { ConsoleLogger } from "@aws-amplify/core";
import { useState } from "react";
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from 'recharts';

function CircleChartBalances({ dataIn }) {

    var data = [];
    var myDict = {};


    dataIn.forEach(item => {
        // console.log(item.stock.sector)

        for (var i = 0; i < dataIn.length; i++) {
            if (myDict.hasOwnProperty(item.stock.sector)) {
                // myDict[item.stock.sector] += 1;

                // for (var i=0; i < dataIn.length; i++) {
                //     myDict[item.stock.sector[i]] = (myDict[item.stock.sector[i]] || 0) +1 ;
                // }

                data.push({ "name": item.stock.sector, "quantity": item.quantity, "value": item.stock.daily_change.currentprice * item.quantity })
                const testSet = new Set([item.stock.sector,  item.stock.daily_change.currentprice * item.quantity ])
                console.log(testSet)
            }


        }

    })


    const [activeIndex, setActiveIndex] = useState(0)

    const COLORS = ['#001219', '#00FF73', '#005F73', '#EE9B00', '#CA6702', '#BB3E03', '#AE2012', '#A90006', '#800020', '#DC093E', '#7209B7', '#3A0CA3'];

    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 8) * cos;
        const sy = cy + (outerRadius + 8) * sin;
        const mx = cx + (outerRadius + 20) * cos;
        const my = cy + (outerRadius + 20) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 10;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text style={{ fontSize: "90%" }} x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`$${value}`}</text>
                <text style={{ fontSize: "90%" }} x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`${(percent * 100).toFixed(1)}%`}
                </text>
            </g>
        );
    };


    const onPieClick = (e, index) => {
        setActiveIndex(index)
    }

    return (
        <ResponsiveContainer width="100%" height={300} margin={0}>
            <PieChart width={100} height={400}>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieClick}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>

    );
}
export default CircleChartBalances;
