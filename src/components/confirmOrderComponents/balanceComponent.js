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
                    <tspan style={{ fontWeight: 700, fontSize: "1.5em", }}>{balance}</tspan>
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
                setData([{ value: newPortfolioBalance },{ value: parseFloat(dollarAmountSelected) }]);
        }else if(buyOrSell === "Sell"){
                setData([{ value: parseFloat(portfolioBalance) },{ value: parseFloat(dollarAmountSelected) }, { value:(holding*stockPrice)-dollarAmountSelected}])
        }
    }, [buyOrSell,dollarAmountSelected,newPortfolioBalance,stockPrice,holding,portfolioBalance])

    return (
        <>
            <Card>
                <Container>
                    <h5 style={{ marginTop: "10px" }}>New Spending Power</h5>
                    <p><strong>{portfolioName}</strong>- Available Spending Power: {parseFloat(portfolioBalance).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</p>
                    <ResponsiveContainer width="100%" height={300} margin={100}>
                        <PieChart height={260} width={500}>
                            <Pie
                                startAngle={220}
                                endAngle={-40}
                                innerRadius="70%"
                                data={data}
                                dataKey="value"
                            >
                                {buyOrSell === "Buy" ?
                                <>
                                    <Cell fill="#1E90FF" />
                                    <Cell fill="#FF0000" />
                                    </>
                                :
                                    <>
                                   <Cell fill="#1E90FF" />
                                   <Cell fill="#32CD32" />
                                   </>
                                }
                             <Label
                                    content={<CustomLabel text={"Spending Power"} balance={parseFloat(newPortfolioBalance).toLocaleString('en-US', {style: 'currency', currency: 'USD' })} />}
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