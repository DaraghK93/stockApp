import {Card,Row,Col} from "react-bootstrap"
import RangeSlider from "../../widgets/RangeSlider/RangeSlider"
import InfoButtonModal from "../../widgets/InfoButtonModal/InfoButtonModal"


function GameBalanceFeesTradeSelection({startingBalance, setStartingBalance, tradingFee, setTradingFee, maxTradesPerDay,setMaxTradesPerDay}){
    ///
    //  Max - 1,000,000
    //  Defautl - 100,000
    //  Min - 1000
    return(
        <>
            <Card.Title className="gameOptionsCardTitle">Balances and Fees</Card.Title>
            <Row>
                <Col>
                    <Card.Text className="gameOptionsCardSubTitle">Starting Balance
                    <InfoButtonModal title="Starting Balance" info={
                        <>
                        <p>The Starting Balance is the Dollar amount each player in the game will have to invest.</p>
                        <p>Each player starts out with the starting balance.</p>
                        <p><span className="bolded">Relaxed ($300,000 - $1,000,000)</span>- Makes the game less realisitc. it's a more relaxed game with freedom to invest</p>
                        <p><span className="bolded">Medium ($25,000 - $300,000)</span>- Still gives you a lot of freedom but you need to be more cautious about some investments</p>
                        <p><span className="bolded">Harsh ($1,000 - $25,000)</span>- More realisitic game. You have less money to spend and need to think about larger investments.</p>
                        </>
                   }/>
                    </Card.Text> 
                    
                </Col>
            </Row>
            <Row>
                <Col>
                    <RangeSlider 
                        label={`$`}
                        setter={setStartingBalance}
                        state={startingBalance}
                        min={1000}
                        max={1000000}
                        startWidth={"6.75rem"}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card.Text className="gameOptionsCardSubTitle">Trading Fee
                    <InfoButtonModal title="Trading Fee" info={
                        <>
                            <p>The Trading Fee is the dollar amount deducted from each trade made within the league. </p>
                            <p>The higher the trading fee the more risk associated with performing trades, as they will cost more money to perform.</p>
                            <p>The lower the trading fee the more freedom the user has to perform trades, without worrying about extra fees.</p>
                            <p><span className="bolded">Relaxed ($1 - $20)</span>- You will not be penalised as much for making lots of trades</p>
                            <p><span className="bolded">Medium ($20 - $150)</span>- You will be penalised more and may have to think more tactically about trades.</p>
                            <p><span className="bolded">Harsh ($150 - $300)</span>- This is a harsher penalty. You will have to think seriously about whether you make money on this trade, while factoring in the trading fee.</p>
                        </>
                        }/>
                    </Card.Text> 
                </Col>
            </Row>
            <Row>
                <Col>
                    <RangeSlider 
                        label={`$`}
                        setter={setTradingFee}
                        state={tradingFee}
                        min={1}
                        max={300}
                        startWidth={"2.75rem"}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card.Text className="gameOptionsCardSubTitle">Max Daily Trades
                    <InfoButtonModal title="Max Daily Trades" info={<>
                            <p>The Max Daily Trades sets a limit on the number of trades you can make within a day.</p>
                            <p>A smaller number set here will force you use to trade more wisely.</p>
                            <p>A larger number set here will give you more freedom to trade.</p>
                            <p><span className="bolded">Relaxed (50 - 100)</span>- A lot of freedom to make lots of trades.</p>
                            <p><span className="bolded">Medium (15 - 50)</span>- Will force you to think more about how you use your daily trades.</p>
                            <p><span className="bolded">Harsh (1 - 15)</span>- You will really need to think about how you can get the most out of your daily trades.</p>
                            </>}/>
                    </Card.Text>  
                </Col>
            </Row>
            <Row>
                <Col>
                    <RangeSlider 
                        setter={setMaxTradesPerDay}
                        state={maxTradesPerDay}
                        min={1}
                        max={100}
                        startWidth={"2rem"}
                    />
                </Col>
            </Row>
            
        </>
    )
}

export default GameBalanceFeesTradeSelection