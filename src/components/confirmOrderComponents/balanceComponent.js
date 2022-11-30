import { Card, Container } from "react-bootstrap";
import { Pie, PieChart, Cell, ResponsiveContainer, Label } from "recharts";

function BalanceComponent({ portfolioName, newPortfolioBalance, dollarAmountSelected, portfolioBalance }) {
    const data = [{ value: parseFloat(dollarAmountSelected) }, { value: newPortfolioBalance }];
    const CustomLabel = ({ viewBox, balance = 0 }) => {
        const { cx, cy } = viewBox;
        return (
            <>
                <text x={cx - 45} y={cy - 5}>
                    <tspan style={{ fontWeight: 700, fontSize: "1.5em", }}>${balance}</tspan>
                </text>
                <text x={cx - 37} y={cy + 15}>
                    <tspan style={{ fontSize: "0.8em", fill: "#A9A9A9" }}>
                        Left to spend
                    </tspan>
                </text>
            </>
        );
    };

    return (
        <>
            <Card>
                <Container>
                    <h5 style={{ marginTop: "10px" }}>New Portfolio Balance</h5>
                    <p><strong>{portfolioName}</strong>- Available Balance: ${portfolioBalance.toFixed(2)}</p>
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
                                <Label
                                    content={<CustomLabel balance={parseFloat(newPortfolioBalance).toFixed(2)} />}
                                    position="center"
                                />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                </Container>
            </Card>
        </>
    )
}

export default BalanceComponent;