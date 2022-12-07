import { Card, Col, Container, Table, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import moment from "moment";

function TransactionHistory({ transactions }) {
    const [status, setStatus] = useState("CANCELLED")
    const [showCancelCol, setShowCancelCol] = useState("")
    const [data, setData] =useState("")

    const updateStatus = (e) => {
        setStatus(e.target.value)
        const filtered = transactions.filter(transaction => {
             return transaction.status === e.target.value
        })
        setData(filtered)
        if (e.target.value == "PENDING") {
            setShowCancelCol(true)

        }
        else {
            setShowCancelCol(false)
        }

    };


    const columns = [
        { label: "Date", accessor: "1", sortable: true, sortbyOrder: "", showHeader: true },
        { label: "Logo", accessor: "2", sortable: false, showHeader: true },
        { label: "Ticker", accessor: "3", sortable: true, showHeader: true },
        { label: "Buy/Sell", accessor: "4", sortable: true, sortbyOrder: "", showHeader: true },
        { label: "Value", accessor: "5", sortable: true, sortbyOrder: "", showHeader: true },
        { label: "Order Type", accessor: "6", sortable: true, sortbyOrder: "", showHeader: true },
        { label: "Fee", accessor: "7", sortable: true, sortbyOrder: "", showHeader: true },
        { label: "Units", accessor: "8", sortable: true, sortbyOrder: "", showHeader: true },
        { label: "CANCEL", accessor: "10", sortable: true, sortbyOrder: "", showHeader: showCancelCol },
    ];


    return (
        <>
            <Card>
                <div className="holdingCard">
                    <Col>
                        <h2 className="cardTitle">Transactions</h2>
                    </Col>
                </div>
                <br />
                <Container>
                    <Button id={1} value="PENDING" onClick={updateStatus}>Pending</Button> <Button id={2} value="COMPLETED" onClick={updateStatus}>Completed</Button> <Button
                        id={3} value="CANCELLED" onClick={updateStatus}>Cancelled</Button>

                    <Table style={{ borderCollapse: "collapse" }}>
                        <thead>
                            <tr key="cols">
                                {columns.map(({ label, accessor, sortable, showHeader, sortbyOrder }) => {
                                    return <th
                                        key={accessor}
                                        className={showHeader ? "leaderBoardShow" : "leaderBoardHide"}
                                    ><strong>{label}</strong>
                                    </th>;
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {data ?
                                data.map((transaction, index) => (
                            <tr key={index}>
                                <td key={transaction.date}>{moment(transaction.date).format('DD-MM-YYYY')}</td>
                                <td key={transaction.stock[0].logo}>{String(transaction.stock[0].logo)}</td>
                                <td key={transaction.stock[0].symbol}>{transaction.stock[0].symbol}</td>
                                <td key={transaction.buyOrSell}>{transaction.buyOrSell}</td>
                                <td key={transaction.value}>{parseFloat(transaction.value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                <td key={transaction.orderType}>{transaction.orderType}</td>
                                <td key={transaction.tradingFee}>{parseFloat(transaction.tradingFee).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                <td key={transaction.units}>{transaction.units.toFixed(2)}</td>
                                <td className={showCancelCol ? "leaderBoardShow" : "leaderBoardHide"}><Button variant="danger">Cancel</Button></td>




                            </tr>
                            ))
                        
                        : 
                        <>
                       
                        </>
                        }



                        </tbody>
                    </Table>
                </Container>
            </Card>
        </>
    )
}

export default TransactionHistory;




    // const transactions = [
    //     {
    //         portfolioId: 123,
    //         stock: "stock object", // returns entire stock object
    //         holdings: "holdings object", //
    //         units: 4,
    //         value: 200,
    //         date: "04-12-2022",
    //         buyOrSell: "SELL",
    //         orderType: "MARKET",
    //         status: "PENDING",
    //         tradingFee: 30,
    //         limitValue: 0
    //     },
    //     {
    //         portfolioId: 1234,
    //         stock: "stock object", // returns entire stock object
    //         holdings: "holdings object", //
    //         units: 6,
    //         value: 300,
    //         date: "04-12-2022",
    //         buyOrSell: "BUY",
    //         orderType: "LIMIT",
    //         status: "COMPLETED",
    //         tradingFee: 20,
    //         limitValue: 0
    //     },
    //     {
    //         portfolioId: 12345,
    //         stock: "stock object", // returns entire stock object
    //         holdings: "holdings object", //
    //         units: 2,
    //         value: 100,
    //         date: "04-12-2022",
    //         buyOrSell: "BUY",
    //         orderType: "MARKET",
    //         status: "CANCELLED",
    //         tradingFee: 30,
    //         limitValue: 0
    //     },
    // ]