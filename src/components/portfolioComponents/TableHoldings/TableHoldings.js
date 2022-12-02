import { Table, Container, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, Fragment } from "react"
import { ChevronUp, ChevronDown } from "react-feather"

function TableHoldings({ data }) {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");
    const [tableData, setTableData] = useState(data)
    // for rows that expand
    const [expandedRows, setExpandedRows] = useState([]);
    const [expandState, setExpandState] = useState({});
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
        { label: "Logo", accessor: "logo", sortable: false },
        { label: "Value", accessor: "value", sortable: true, sortbyOrder: "desc" },
        { label: "", accessor: "trade_button", sortable: false },
        { label: "", accessor: "expand", sortable: false },
    ];

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
            setPostsPerPage(totalPosts)
        }
    }

    return (
        <>
            <Container>
                <Table>

                    <thead>
                        <tr key="cols">
                            {columns.map(({ label, accessor, sortable }) => {
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
                                >{label}{arrow()}
                                </th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map((item) => (
                            (<Fragment key={`${item.symbol}-fragment`}>
                                <tr key={item.symbol} style={{ height: "50px" }}>
                                    <td key={item.logo}><Link to={`/stock/${item.symbol}`}>
                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <div style={{
                                                width: "3.5rem",
                                                height: "1.5rem",
                                            }}>
                                                <img src={item.logo} style={{
                                                    maxWidth: "100%",
                                                    height: "auto",
                                                    display: "block",
                                                    objectFit: "contain"

                                                }} alt="company logo"></img>
                                            </div>
                                        </div>
                                    </Link></td>


                                    <td key={item.currentValue.toFixed(2)}>${item.currentValue.toFixed(2)}</td>
                                    <td key={`/stock/${item.symbol}/confirmorder`}><Link to={`/stock/${item.symbol}/confirmorder`}><Button>Trade</Button></Link></td>
                                    <td key={`${item.symbol}/button`}>
                                        <Button style={{ padding: 0, margin: 0, color: "black" }}

                                            variant="link"
                                            onClick={event => handleExpandRow(event, item.symbol)}>
                                            {
                                                expandState[item.symbol] ?
                                                    <ChevronUp /> : <ChevronDown />
                                            }
                                        </Button></td>
                                </tr>
                                <>
                                    {
                                        expandedRows.includes(item.symbol) ?
                                            <tr key={`${item.symbol}-expanded`}>
                                                <td key={`${item.symbol}-expanded-row`} colSpan="6">
                                                    <div>
                                                        <h3>{item.longname}</h3>
                                                        <ul key={`${item.symbol}-expanded-info`} style={{ listStyleType: "none" }}>
                                                            <li key={item.units.toFixed(2)}><strong>Shares held: </strong>{item.units.toFixed(2)} stocks</li>
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
                                <Dropdown.Item key={5} id={5} onClick={changePostsPerPage}>Show 5</Dropdown.Item>
                                <Dropdown.Item key={10} id={10} onClick={changePostsPerPage}>Show 10</Dropdown.Item>
                                <Dropdown.Item key={15} id={15} onClick={changePostsPerPage}>Show 15</Dropdown.Item>
                                <Dropdown.Item key={"all"} id={"all"} onClick={changePostsPerPage}>Show {totalPosts} (all)</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ul>
                </div>
            </Container>
        </>
    )
}

export default TableHoldings;