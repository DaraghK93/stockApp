import { Card, Col, Container, Table, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

function TransactionHistory({ transactions }) {
    const [status, setStatus] = useState("CANCELLED")
    const [showCancelCol, setShowCancelCol] = useState("")

    const updateStatus = (e) => {
        setStatus(e.target.value)
        if (e.target.value == "PENDING") {
            setShowCancelCol(true)
        }
        else {
            setShowCancelCol(false)
        }

    }

    const columns = [
        { label: "Date", accessor: "1", sortable: true, sortbyOrder: "", showHeader: true },
        { label: "Logo", accessor: "2", sortable: false, showHeader: true },
        { label: "Ticker", accessor: "3", sortable: true, showHeader: true },
        { label: "Buy/Sell", accessor: "4", sortable: true, sortbyOrder: "", showHeader: true },
        { label: "Value", accessor: "5", sortable: true, sortbyOrder: "", showHeader: true },
        { label: "Order Type", accessor: "6", sortable: true, sortbyOrder: "", showHeader: true },
        { label: "Fee", accessor: "7", sortable: true, sortbyOrder: "", showHeader: true },
        { label: "Units", accessor: "8", sortable: true, sortbyOrder: "", showHeader: true },
        { label: "Stock Price", accessor: "9", sortable: true, sortbyOrder: "", showHeader: true },
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
                            {transactions.map((transaction) => (
                                transaction.status == status ?
                                    <tr key={`${transaction.logo}-row`}>
                                        <td key={transaction.date}>{transaction.date}</td>
                                        <td key={transaction.logo}>{transaction.logo}</td>

                                        <td>{transaction.symbol}</td>
                                        <td>{transaction.buyOrSell}</td>
                                        <td>{transaction.value}</td>
                                        <td>{transaction.orderType}</td>

                                        <td>{transaction.tradingFee}</td>
                                        <td>{transaction.logo}</td>
                                        <td>{transaction.logo}</td>
                                        <td>{transaction.logo}</td>
                                    </tr>
                                    :
                                    null

                            )
                            )}



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