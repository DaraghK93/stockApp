import { Table, Container, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, Fragment, useEffect } from "react"
import { ChevronUp, ChevronDown } from "react-feather"
import MessageAlert from "../../widgets/MessageAlert/MessageAlert";

function TableHoldings({ data }) {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");
    const [tableData, setTableData] = useState(data)
    // for rows that expand
    const [expandedRows, setExpandedRows] = useState([]);
    const [expandState, setExpandState] = useState({});
    // for showing cols
    const [showCol, setShowCol] = useState(true)
    const [hideCol, setHideCol] = useState(false)
    // for pagination
    const [postsPerPage, setPostsPerPage] = useState(5)
    const pageNumbers = [];
    const [currentPage, setCurrentPage] = useState(1)
    const totalPosts = tableData.length;
    // currentview
    const indexOfLastPage = currentPage * postsPerPage;
    const indexOfFirstPage = indexOfLastPage - postsPerPage;
    const currentPosts = tableData.slice(indexOfFirstPage, indexOfLastPage)

    const columns = [
        { label: "Company", accessor: "logo", sortable: false, showHeader: true },
        { label: "Ticker", accessor: "symbol", sortable: true, showHeader: showCol },
        { label: "Value", accessor: "currentValue", sortable: true, sortbyOrder: "desc", showHeader: true },
        { label: "Qty", accessor: "units", sortable: true, sortbyOrder: "desc", showHeader: showCol },
        { label: "Stock Price", accessor: "currentPrice", sortable: true, sortbyOrder: "desc", showHeader: showCol },
        { label: "", accessor: "trade_button", sortable: false, showHeader: true },
        { label: "", accessor: "expand", sortable: false, showHeader: hideCol },
    ];

    useEffect(() => {
        showCols()
        const filtered = data.filter(holding => {
            return parseFloat(holding.units) > 0
        })
        setTableData(filtered)
    }, [data])

    window.addEventListener("resize", showCols);

    function showCols() {
        if (window.innerWidth >= 800) {
            setShowCol(true)
            setHideCol(false)
        }
        else {
            setShowCol(false)
            setHideCol(true)
        }
    }

    // sorting functions
    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
            const sorted = [...tableData].sort((a, b) => {
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)

                );
            });
            setTableData(sorted);
        }
    };

    const handleSortingChange = (accessor) => {
        const sortOrder =
            accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
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

    //pagination
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
    const pagination = (pageNumbers) => {
        setCurrentPage(pageNumbers)
    }

    //change amount of posts shown
    const changePostsPerPage = (e) => {
        if (e.target.id !== "all") {
            setPostsPerPage(e.target.id)
        }
        else {
            setCurrentPage(1)
            setPostsPerPage(totalPosts)
        }
    }

    return (
        <>
            {tableData.length > 0 ?
                <Container>


                    <Table style={{ borderCollapse: "collapse" }}>
                        <thead style={{ color: "black", verticalAlign: "middle", fontSize: "80%", textAlign: "center" }} >
                            <tr style={{ verticalAlign: "middle", fontSize: "90%", textAlign: "center" }} key="cols">
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
                                    ><strong>{label}</strong>{arrow()}
                                    </th>;
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((item, index) => (
                                (<Fragment key={`${index}-fragment`}>
                                    <tr style={{ verticalAlign: "middle" }} key={item.symbol}>
                                        <td key={item.logo}><center><Link to={`/stock/${item.symbol}`}>
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <div style={{
                                                    width: "3.5rem",
                                                    height: "2rem",
                                                }}>
                                                    <img src={item.logo} style={{
                                                        height: "100%",
                                                        maxWidth: "100%",
                                                        display: "block",
                                                        objectFit: "contain"
                                                    }} alt="company logo"></img>
                                                </div>
                                            </div>
                                        </Link></center></td>

                                        <td className={showCol ? "leaderBoardShow" : "leaderBoardHide"}><center>{item.symbol}</center></td>
                                        <td key={`${index}-currentValue`}><center>{parseFloat(item.currentValue).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</center></td>

                                        <td className={showCol ? "leaderBoardShow" : "leaderBoardHide"} key={`${index}-units`}><center>{item.units.toFixed(2)}</center></td>
                                        <td className={showCol ? "leaderBoardShow" : "leaderBoardHide"} key={`${index}-currentprice`}><center>{parseFloat(item.currentPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</center></td>
                                        <td key={`/stock/${item.symbol}/confirmorder`}><center><Link to={`/stock/${item.symbol}/confirmorder`}><Button>Trade</Button></Link></center></td>
                                        <td className={hideCol ? "leaderBoardShow" : "leaderBoardHide"} key={`${item.symbol}/button`}><center>
                                            <Button style={{ padding: 0, margin: 0, color: "black" }}

                                                variant="link"
                                                onClick={event => handleExpandRow(event, item.symbol)}>
                                                {
                                                    expandState[item.symbol] ?
                                                        <ChevronUp /> : <ChevronDown />
                                                }
                                            </Button></center></td>
                                    </tr>
                                    <>
                                        {
                                            expandedRows.includes(item.symbol) ?
                                                <tr key={`${item.symbol}-expanded`}>
                                                    <td key={`${item.symbol}-expanded-row`} colSpan="6">
                                                        <div>
                                                            <h3>{item.longname}</h3>
                                                            <ul key={`${item.symbol}-expanded-info`} style={{ listStyleType: "none" }}>
                                                                <li className={hideCol ? "leaderBoardShow" : "leaderBoardHide"} key={item.symbol}><strong>Ticker Symbol: </strong>{item.symbol}</li>
                                                                <li className={hideCol ? "leaderBoardShow" : "leaderBoardHide"} key={item.units.toFixed(2)}><strong>Shares held: </strong>{item.units.toFixed(2)} stocks</li>
                                                                <li key={item.currentPrice.toFixed(2)}><strong>Current Price: </strong>${item.currentPrice.toFixed(2)}</li>
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
                    {tableData.length > 5 ?
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <nav>
                                <ul key="pagination" className="pagination">
                                    {pageNumbers.map(number => (
                                        <li key={number} className={currentPage === number ? 'page-item active' : 'page-item'}>
                                            <button onClick={() => pagination(number)} className="page-link"> {number} </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <ul className="pagination">
                                <Dropdown className="d-inline mx-2">
                                    <Dropdown.Toggle
                                        id="dropdown-autoclose-true">
                                        Show {postsPerPage}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {
                                            tableData.length < 10 ?
                                                <>
                                                    <Dropdown.Item key={5} id={5} onClick={changePostsPerPage}>Show 5</Dropdown.Item>
                                                    <Dropdown.Item key={"all"} id={"all"} onClick={changePostsPerPage}>Show {totalPosts} (all)</Dropdown.Item>
                                                </> :

                                                tableData.length < 15 ?
                                                    <>
                                                        <Dropdown.Item key={5} id={5} onClick={changePostsPerPage}>Show 5</Dropdown.Item>
                                                        <Dropdown.Item key={10} id={10} onClick={changePostsPerPage}>Show 10</Dropdown.Item>
                                                        <Dropdown.Item key={"all"} id={"all"} onClick={changePostsPerPage}>Show {totalPosts} (all)</Dropdown.Item>
                                                    </>


                                                    :
                                                    <>
                                                        <Dropdown.Item key={5} id={5} onClick={changePostsPerPage}>Show 5</Dropdown.Item>
                                                        <Dropdown.Item key={10} id={10} onClick={changePostsPerPage}>Show 10</Dropdown.Item>
                                                        <Dropdown.Item key={15} id={15} onClick={changePostsPerPage}>Show 15</Dropdown.Item>
                                                        <Dropdown.Item key={"all"} id={"all"} onClick={changePostsPerPage}>Show {totalPosts} (all)</Dropdown.Item>
                                                    </>
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </ul>
                        </div> : null}

                </Container> :
                <Container>
                    <MessageAlert variant='info' >
                        You have no holdings! <Link to="/stockdiscovery/" style={{ color: "black" }}><strong>Click here</strong></Link> to start
                        exploring stocks and building your portfolio!
                    </MessageAlert>
                </Container>
            }
        </>
    )
}

export default TableHoldings;