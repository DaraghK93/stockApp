import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Cell,
    Legend
} from "recharts";

function PieChartViz({ data }) {

    const renderColorfulLegendText = (value, entry) => {
        const color = "black";
      
        return <span style={{ color }}>{value}</span>;
      }

    const COLORS = [
        '#32CD32', '#FF0000', '#FFBB28'  ];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart width={400} height={400}>
                    <Legend layout="vertical" verticalAlign="middle" align="left" formatter={renderColorfulLegendText} />
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

        </>
    )
};

export default PieChartViz;