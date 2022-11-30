import { Card, Container } from "react-bootstrap";
import { Pie, PieChart, Cell, ResponsiveContainer, Label } from "recharts";
import {useEffect,useState} from 'react';



function BalanceComponent({ portfolioName, newPortfolioBalance, dollarAmountSelected, portfolioBalance, buyOrSell, stockPrice, holding }) {
    const [data, setData] = useState(true);

    const CustomLabel = ({ viewBox, balance = 0, text }) => {
        const { cx, cy } = viewBox;
        return (
            <>
                <text x={cx - 45} y={cy - 5}>
                    <tspan style={{ fontWeight: 700, fontSize: "1.5em", }}>${balance}</tspan>
                </text>
                <text x={cx - 37} y={cy + 15}>
                    <tspan style={{ fontSize: "0.8em", fill: "#A9A9A9" }}>
                        {text}
                    </tspan>
                </text>
            </>
        );
    };

    useEffect(() => {
        if(buyOrSell === "Buy"){
                setData([{ value: parseFloat(dollarAmountSelected) }, { value: newPortfolioBalance }]);
        }else if(buyOrSell === "Sell"){
                setData([{ value: parseFloat(dollarAmountSelected) }, { value:(holding*stockPrice)-dollarAmountSelected}])
        }
    }, [buyOrSell,dollarAmountSelected,newPortfolioBalance,stockPrice,holding])

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
                            {buyOrSell === "Buy"?
                             <Label
                                    content={<CustomLabel text={"Left to Spend"} balance={parseFloat(newPortfolioBalance)} />}
                                    position="center"
                                />
                            :
                            <Label
                                    content={<CustomLabel text={"New Balance"} balance={parseFloat(newPortfolioBalance)} />}
                                    position="center"
                                />
                            }
                               
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                </Container>
            </Card>
        </>
    )
}

export default BalanceComponent;