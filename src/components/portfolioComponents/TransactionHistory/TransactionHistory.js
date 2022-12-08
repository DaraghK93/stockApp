import { Card, Col, Container, Table, Button } from "react-bootstrap";
import { useState, useEffect, Fragment } from "react";
import moment from "moment";
import { Link } from "react-router-dom"
import MessageAlert from "../../widgets/MessageAlert/MessageAlert";
import { ChevronUp, ChevronDown } from "react-feather"

function TransactionHistory({ transactions }) {
    // for column in pending
    const [showPendingCol, setShowPendingCol] = useState(false)
    const [hidePendingCol, setHidePendingCol] = useState(true)
    // data state
    const [data, setData] = useState(transactions)
    const [currentStatus, setCurrentStatus] = useState("COMPLETED")
    // for rows that expand
    const [expandedRows, setExpandedRows] = useState([]);
    const [expandState, setExpandState] = useState({});
    // sorting state
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");
    // states for showing and hiding in desktop
    const [hideMobile, setHideMobile] = useState()
    const [hideDesktop, setHideDesktop] = useState()

    useEffect(() => {
        showCols()
        const filtered = transactions.filter(transaction => {
            return transaction.status === "COMPLETED"
        })
        setData(filtered)
    }, [transactions])

    function filterBuySell(e) {
        if (e.target.value === "ALL") {
            const filtered = transactions.filter(transaction => {
                return transaction.status === currentStatus
            })
            setData(filtered)
        } else {
            const filtered = transactions.filter(transaction => {
                return transaction.status === currentStatus && transaction.buyOrSell === e.target.value
            })
            setData(filtered)
        }
    }

    window.addEventListener("resize", showCols);

    function showCols() {
        if (window.innerWidth >= 576) {
            setHideMobile(true)
            setHideDesktop(false)
        }
        else {
            setHideMobile(false)
            setHideDesktop(true)
        }
    }

    const columns = [
        { label: "Date", accessor: "date", sortable: true, sortbyOrder: "", showHeader: hideMobile },//
        { label: "Company", accessor: "logo", sortable: false, showHeader: true },//
        { label: "Ticker", accessor: "symbol", sortable: true, showHeader: hideMobile },
        { label: "Buy/Sell", accessor: "buyOrSell", sortable: true, sortbyOrder: "", showHeader: hideMobile },
        { label: "Value", accessor: "value", sortable: true, sortbyOrder: "", showHeader: hidePendingCol },//
        { label: "Order Type", accessor: "orderType", sortable: true, sortbyOrder: "", showHeader: hideMobile },
        { label: "Fee", accessor: "tradingFee", sortable: true, sortbyOrder: "", showHeader: hideMobile },
        { label: "Units", accessor: "units", sortable: true, sortbyOrder: "", showHeader: hideMobile },
        { label: "Limit Value", accessor: "1", sortable: false, sortbyOrder: "", showHeader: showPendingCol },
        { label: "", accessor: "2", sortable: false, sortbyOrder: "", showHeader: showPendingCol },
        { label: "", accessor: "3", sortable: false, sortbyOrder: "", showHeader: true },
    ];

    const statuses = ["PENDING", "COMPLETED", "CANCELLED"]

    const updateStatus = (status) => {
        setCurrentStatus(status)
        const filtered = transactions.filter(transaction => {
            return transaction.status === status
        })
        setData(filtered)
        if (status === "PENDING") {
            setShowPendingCol(true)
            setHidePendingCol(false)

        }
        else {
            setShowPendingCol(false)
            setHidePendingCol(true)
        }
    }

    // expand row function
    const handleExpandRow = (event, userId) => {
        const currentExpandedRows = expandedRows;
        const isRowExpanded = currentExpandedRows.includes(userId);

        let obj = {};
        isRowExpanded ? (obj[userId] = false) : (obj[userId] = true);
        setExpandState(obj);

        // If the row is expanded, this is the logic for hiding it.
        // Remove it from state variable. Otherwise add to it.
        const newExpandedRows = isRowExpanded ?
            currentExpandedRows.filter(id => id !== userId) :
            currentExpandedRows.concat(userId);
        setExpandedRows(newExpandedRows);
    }

    // sorting functions
    const handleSorting = (sortField, sortOrder) => {
        if (sortField !== "symbol") {


            const sorted = [...data].sort((a, b) => {
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)

                );
            });
            setData(sorted);
        }
        else {
            const sorted = [...data].sort((a, b) => {
                return (
                    a["stock"][0]["symbol"].toString().localeCompare(b["stock"][0]["symbol"].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)

                );
            });
            setData(sorted);
        }
    };
    const handleSortingChange = (accessor) => {
        const sortOrder =
            accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
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
                        <br></br>



                    </div><center>
                    <Button value="BUY" onClick={filterBuySell}>BUY</Button> <Button value="SELL" onClick={filterBuySell}>SELL</Button> <Button value="ALL" onClick={filterBuySell}>ALL</Button>
                    </center>
                    {data.length > 0 ?
                        <Table style={{ borderCollapse: "collapse" }}>
                            <thead>
                                <tr key="cols">
                                    {columns.map(({ label, accessor, sortable, showHeader, sortbyOrder }) => {

                                        function arrow() {
                                            if (sortable === true) {
                                                if (sortField === accessor && order === "asc") {
                                                    return <ChevronUp size={15}></ChevronUp>
                                                }
                                                else {
                                                    return <ChevronDown size={15}></ChevronDown>
                                                }
                                            }
                                            else {
                                                return ""
                                            }
                                        }
                                        return <th
                                            key={accessor}
                                            onClick={sortable ? () => handleSortingChange(accessor) : null}
                                            className={showHeader ? "leaderBoardShow" : "leaderBoardHide"}
                                        ><strong><center>{label}{arrow()}</center></strong>
                                        </th>;
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((transaction, index) => (
                                    (<Fragment key={`${index}-fragment`}>
                                        <tr key={transaction.stock[0].symbol}>
                                            <td key={transaction.date} className={hideMobile ? "leaderBoardShow" : "leaderBoardHide"}><center>{moment(transaction.date).format('DD-MM-YYYY')}</center></td>
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
                                            <td className={hideMobile ? "leaderBoardShow" : "leaderBoardHide"} key={transaction.stock[0].symbol}><center>{transaction.stock[0].symbol}</center></td>
                                            <td className={hideMobile ? "leaderBoardShow" : "leaderBoardHide"} key={transaction.buyOrSell}><center>{transaction.buyOrSell}</center></td>
                                            <td className={hidePendingCol ? "leaderBoardShow" : "leaderBoardHide"} key={transaction.value}><center>{parseFloat(transaction.value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</center></td>
                                            <td className={hideMobile ? "leaderBoardShow" : "leaderBoardHide"} key={transaction.orderType}><center>{transaction.orderType}</center></td>
                                            <td className={hideMobile ? "leaderBoardShow" : "leaderBoardHide"} key={transaction.tradingFee}><center>{parseFloat(transaction.tradingFee).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</center></td>
                                            <td className={hideMobile ? "leaderBoardShow" : "leaderBoardHide"} key={transaction.units}><center>{transaction.units.toFixed(2)}</center></td>
                                            <td className={showPendingCol ? "leaderBoardShow" : "leaderBoardHide"} key={transaction.value / transaction.units}><center>{parseFloat(transaction.value / transaction.units).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</center></td>
                                            <td className={showPendingCol ? "leaderBoardShow" : "leaderBoardHide"} key={index + 100}><center><Button variant="danger">Cancel</Button></center></td>
                                            <td className={hideDesktop ? "leaderBoardShow" : "leaderBoardHide" } key={index + 200}>
                                                <center><Button style={{ padding: 0, margin: 0, color: "black" }}
                                                variant="link"
                                                onClick={event => handleExpandRow(event, transaction.stock[0].symbol)}>
                                                {
                                                    expandState[transaction.stock[0].symbol] ?
                                                        <ChevronUp /> : <ChevronDown />
                                                }
                                            </Button></center></td>
                                        </tr>
                                        <>
                                            {
                                                expandedRows.includes(transaction.stock[0].symbol) ?
                                                    <tr key={`${transaction.stock[0].symbol}-expanded`}>
                                                        <td key={`${transaction.stock[0].symbol}-expanded-row2`} colSpan="6">
                                                            <div>
                                                                <h3>{transaction.stock[0].shortname}</h3>


                                                                <ul style={{ listStyleType: "none" }}>
                                                                    <li><strong>Date: </strong>{moment(transaction.date).format('DD-MM-YYYY')}</li>
                                                                    <li><strong>Ticker: </strong>{transaction.stock[0].symbol}</li>
                                                                    <li><strong>Buy/ Sell: </strong>{transaction.buyOrSell}</li>
                                                                    <li><strong>Value: </strong>{parseFloat(transaction.value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</li>
                                                                    <li><strong>Order Type: </strong>{transaction.orderType}</li>
                                                                    <li><strong>Trading Fee: </strong>{parseFloat(transaction.tradingFee).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</li>
                                                                    <li><strong>Stocks: </strong>{transaction.units.toFixed(2)}</li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr> : null
                                            }
                                        </>
                                    </Fragment>)
                                ))}
                            </tbody>
                        </Table>
                        :
                        <MessageAlert variant="info">No {currentStatus.toLowerCase()} transactions for this game!</MessageAlert>
                    }
                </Container>
            </Card>
        </>
    )
}

export default TransactionHistory;


// Logo or Ticker
// Buy/Sell
// Limit Price
// Units
// Cancel

// change nav to limit orders or pending limit orders

// remove Fee
//Date