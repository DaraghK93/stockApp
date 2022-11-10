import { PieChart, Pie, Sector, Cell, Legend, ResponsiveContainer } from 'recharts';
import { Container, Card } from "react-bootstrap";

function CircleChartBalances() {

    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <Container>
            <Card>
                <h1>Circle Chart Balances</h1>
                <ResponsiveContainer width="100%" height={400} margin={100}>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data}
                            cx={"50%"}
                            cy={"50%"}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}

                        </Pie>

                    </PieChart>
                    {/* <Legend layout="horizontal" verticalAlign="top" align="center" /> */}
                    {/* <Legend></Legend> */}
                </ResponsiveContainer>
            </Card>
        </Container>
    )
}

export default CircleChartBalances