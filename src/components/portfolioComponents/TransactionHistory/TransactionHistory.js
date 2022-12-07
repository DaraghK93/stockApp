import { Card, Col, Container, Table, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import moment from "moment";
import {Link} from "react-router-dom"

function TransactionHistory({ transactions }) {

    const [showCancelCol, setShowCancelCol] = useState("")
    const [data, setData] =useState("")
    const [currentStatus, setCurrentStatus] = useState("COMPLETED")

    useEffect(() => {
        const filtered = transactions.filter(transaction => {
            return transaction.status === "COMPLETED"
       })
       setData(filtered)
    }, [transactions])


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

    const statuses = ["PENDING", "COMPLETED", "CANCELLED"]

    const updateStatus = (status) => {
        setCurrentStatus(status)
        const filtered = transactions.filter(transaction => {
            return transaction.status === status
       })
       setData(filtered)
       if (status === "PENDING") {
           setShowCancelCol(true)

       }
       else {
           setShowCancelCol(false)
       }
    }


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


                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <nav>
                            <ul key="updateStatus" className="pagination">
                                {statuses.map(status => (
                                    <li key={status} value={status} className={currentStatus === status ? 'page-item active' : 'page-item'}>
                                        <button onClick={() => updateStatus(status)} className="page-link"> {status} </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                </div>
                    <Table style={{ borderCollapse: "collapse" }}>
                        <thead>
                            <tr key="cols">
                                {columns.map(({ label, accessor, sortable, showHeader, sortbyOrder }) => {
                                    return <th
                                        key={accessor}
                                        className={showHeader ? "leaderBoardShow" : "leaderBoardHide"}
                                    ><strong><center>{label}</center></strong>
                                    </th>;
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {data ?
                                data.map((transaction, index) => (
                            <tr key={index}>
                                <td key={transaction.date}><center>{moment(transaction.date).format('DD-MM-YYYY')}</center></td>
                                <td key={transaction.stock[0].logo}><center><Link to={`/stock/${transaction.stock[0].symbol}`}>
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <div style={{
                                                    width: "3.5rem",
                                                    height: "2rem",
                                                }}>
                                                    <img src={transaction.stock[0].logo} style={{
                                                        height: "100%",
                                                        maxWidth: "100%",
                                                        display: "block",
                                                        objectFit: "contain"
                                                    }} alt="company logo"></img>
                                                </div>
                                            </div>
                                        </Link></center></td>
                                <td key={transaction.stock[0].symbol}><center>{transaction.stock[0].symbol}</center></td>
                                <td key={transaction.buyOrSell}><center>{transaction.buyOrSell}</center></td>
                                <td key={transaction.value}><center>{parseFloat(transaction.value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</center></td>
                                <td key={transaction.orderType}><center>{transaction.orderType}</center></td>
                                <td key={transaction.tradingFee}><center>{parseFloat(transaction.tradingFee).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</center></td>
                                <td key={transaction.units}><center>{transaction.units.toFixed(2)}</center></td>
                                <td className={showCancelCol ? "leaderBoardShow" : "leaderBoardHide"}><center><Button variant="danger">Cancel</Button></center></td>




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