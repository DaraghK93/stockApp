import { Card, Container } from "react-bootstrap";
import { Pie, PieChart, Cell, ResponsiveContainer, Label } from "recharts";
import {useEffect,useState} from 'react';
import InfoButtonModal from "../widgets/InfoButtonModal/InfoButtonModal";



function BalanceComponent({ portfolioName, newPortfolioBalance, dollarAmountSelected, portfolioBalance, buyOrSell, stockPrice, holding, orderType, limitPrice, qty, gameTradeFee}) {
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
        const setGraphData = () => {
        if(buyOrSell === "Buy"){
                setData([{ value: newPortfolioBalance },{ value: parseFloat(dollarAmountSelected) }]);
        }else if(buyOrSell === "Sell"){
                if (orderType === "Market Order" && (dollarAmountSelected <= (holding*stockPrice))){
                    setData([{ value: parseFloat(portfolioBalance) },{ value: parseFloat(dollarAmountSelected) }, { value:(holding*stockPrice)-dollarAmountSelected}]) 
                }else if (orderType === "Limit Order"){
                    setData([{ value: parseFloat(portfolioBalance) },{ value: parseFloat(dollarAmountSelected) }, { value:((Math.floor(stockPrice*1.15))*holding)-dollarAmountSelected}]) 
                }
        }
        }
        setGraphData()
    }, [setData,buyOrSell,dollarAmountSelected,newPortfolioBalance,stockPrice,holding,portfolioBalance, orderType])

    return (
        <>
            <Card>
                <Container>
                    {buyOrSell === "Sell" && orderType === "Limit Order" ? 
                    <h5 style={{ marginTop: "10px" }}>Potential New Spending Power
                    <InfoButtonModal
                        title="Potential New Spending Power" info={
                        <>
                        <p>The order you are placing is a <span className="semibolded">Limit Sell Order.</span></p>
                        <p>The New Spending Power is not certain and hence marked as the <span className="semibolded">Potential Spending Power.</span></p>
                        <p>The order will be completed in the future when the value of the stock reaches the limit price you inputted of <span className="semibolded"> {parseFloat(limitPrice).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</span>.</p>
                        <p>At this point your spending power will rise by the number of stocks you are selling, in this case <span className="semibolded">{qty}</span> multipled by the limit price 
                        <span className="semibolded"> {parseFloat(limitPrice).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}.</span></p>
                        <p><span className="semibolded">{qty}</span> x <span className="semibolded"> {parseFloat(limitPrice).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</span> = <span className="semibolded">{parseFloat(limitPrice*qty).toLocaleString('en-US', {style: 'currency', currency: 'USD' })} </span></p>
                        <p>Your Potential Spending Power is this number added onto your current Spending Power of <span className="semibolded"> {parseFloat(portfolioBalance).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</span> minus the Game trade fee of <span className="semibolded">{parseFloat(gameTradeFee).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</span></p>
                        <p><span className="bolded">Potential New Spending Power:</span> </p><p><span className="semibolded">{parseFloat(portfolioBalance).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</span> +  
                            <span className="semibolded">{parseFloat(limitPrice*qty).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</span> - <span className="semibolded">{parseFloat(gameTradeFee).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</span> = <span className="bolded">{parseFloat(((limitPrice*qty)+portfolioBalance)-gameTradeFee).toLocaleString('en-US', {style: 'currency', currency: 'USD' })} </span>
                        </p>
                        </>
                        }
                    />
                    </h5>
                    :
                    <h5 style={{ marginTop: "10px" }}>New Spending Power
                    <InfoButtonModal
                        title="New Spending Power" info={
                        <>
                        <p>Spending Power is the amount in Dollars you have available to purchase stocks.</p>
                        { buyOrSell === "Buy" ?
                        <> 
                        <p>You have selected <span className="semibolded">Buy</span> which means you are purchasing stocks.</p>
                        <p>This results in your Spending Power <span className="semibolded redNegative">Decreasing.</span></p>
                        </>
                        :
                        <>
                        <p>You have selected <span className="semibolded">Sell</span> which means you are selling stocks you previously bought.</p>
                        <p>This results in your Spending Power <span className="bolded greenPositive">Increasing.</span></p>
                        </>
                        
                        }
                        
                        </>
                        }
                    />
                    </h5>
                    }
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
                                    content={<CustomLabel 
                                    text={"Spending Power"} 
                                    balance={parseFloat(newPortfolioBalance).toLocaleString('en-US', {style: 'currency', currency: 'USD' })} />}
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