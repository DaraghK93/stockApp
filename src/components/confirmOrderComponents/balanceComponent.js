import { Card, Container } from "react-bootstrap";
import { Pie, PieChart, Cell, ResponsiveContainer, Label } from "recharts";

function BalanceComponent() {
    const data = [{ value: 500 }, { value: 1500 }];
    return (
        <>
            <Card>
                <Container>
                    <h5 style={{ marginTop: "10px" }}>New Portfolio Balance</h5>
                    <ResponsiveContainer width="100%" height={300} margin={100}>
      
                        <PieChart height={260} width={500}>
                            <Pie
                                startAngle={220}
                                endAngle={-40}
                                innerRadius="70%"
                                data={data}
                                dataKey="value"
                            >
                                <Cell fill="#1E90FF" />
                                <Cell fill="#595959" />
                                <Label value="$700" position="center" />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                </Container>
            </Card>
        </>
    )
}

export default BalanceComponent;