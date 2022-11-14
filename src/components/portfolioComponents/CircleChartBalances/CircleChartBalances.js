import { useState } from "react";
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from 'recharts';

function CircleChartBalances({ dataIn }) {

    var data = [];

    dataIn.forEach(item => {
        data.push({ "name": item.stock.symbol, "quantity": item.quantity, "value": item.stock.daily_change.currentprice * item.quantity })
    })

    const [activeIndex, setActiveIndex] = useState(0)

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, quantity } = props;
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
                <text style={{ fontSize: "90%" }} x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Units: ${quantity}`}</text>
                <text style={{ fontSize: "90%" }} x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`${(percent * 100).toFixed(2)}%`}
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
