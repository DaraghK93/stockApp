import { Table, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react"
import { ChevronUp, ChevronDown } from "react-feather"

function TableHoldings({ data }) {
    var mytableData = [];

    data.forEach(item => {
        mytableData.push({
            "logo": item.stock.logo,
            "longname": item.stock.longname,
            "symbol": item.stock.symbol,
            "value": item.stock.daily_change.currentprice * item.quantity,
            "quantity": item.quantity,
            "price": item.stock.daily_change.currentprice
        })
    })

    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");
    const [tableData, setTableData] = useState(mytableData)
    // for rows that expand
    const [expandedRows, setExpandedRows] = useState([]);
    const [expandState, setExpandState] = useState({});
    // for pagination




    const columns = [
        { label: "Logo", accessor: "logo", sortable: false },
        { label: "Value", accessor: "value", sortable: true, sortbyOrder: "desc" },
        { label: "", accessor: "trade_button", sortable: false },
        { label: "", accessor: "expand", sortable: false },
    ];

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

    const handleExpandRow = (event, userId) => {
        const currentExpandedRows = expandedRows;
        const isRowExpanded = currentExpandedRows.includes(userId);

        let obj = {};
        isRowExpanded ? (obj[userId] = false) : (obj[userId] = true);
        setExpandState(obj);

        // If the row is expanded, we are here to hide it. Hence remove
        // it from the state variable. Otherwise add to it.
        const newExpandedRows = isRowExpanded ?
            currentExpandedRows.filter(id => id !== userId) :
            currentExpandedRows.concat(userId);

        setExpandedRows(newExpandedRows);
    }


    // const ShowData = () => {

    //     const { postsPerPage, currentPage, data } = this.state;
    //     const indexOfLastPage = currentPage * postsPerPage;
    //     const indexOfFirstPage = indexOfLastPage - postsPerPage;
    //     const currentPosts = data.slice(indexOfFirstPage, indexOfLastPage)
  
    //    try{
    //    return currentPosts.map((item, index) => {
    //      return(
    //        <tbody>
    //        <tr>
    //        <td>{postsPerPage * (currentPage-1)+index+1}</td>
    //        <td>{item.userId}</td>
    //        <td>{item.title}</td>
    //        <td>{item.completed.toString()}</td>
    //        </tr>
    //        </tbody>
    //      )
    //    })
    //  }catch(e){
    //    alert(e.message)
    //  }
    //  }


    const ShowPagination = () => {
        const [postsPerPage, setPostsPerPage] = useState(5)
        const pageNumbers = [];
        const [currentPage, setCurrentPage] = useState()
        const totalPosts = tableData.length;
 

        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
            pageNumbers.push(i)
        }

        const pagination = (pageNumbers) => {
            setCurrentPage(pageNumbers)
        }

        return (
            <nav>
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className={currentPage === number ? 'page-item active' : 'page-item'}>
                            <button onClick={() => pagination(number)} className="page-link"> {number} </button>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }







    return (
        <>
            <Container>
                <Table style={{ fontSize: "90%" }}>

                    <thead>
                        <tr>
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
                        {tableData.map((item) => (
                            <>
                                <tr
                                    key={item.symbol}
                                >
                                    <td key="logo"><Link to={`/stock/${item.symbol}`}><img src={item.logo} style={{ width: "5rem" }} alt="company logo"></img></Link></td>
                                    {/* <td key="ticker_symbol">{item.symbol}</td> */}
                                    <td key="value">${item.value.toFixed(2)}</td>
                                    {/* <td key="quantity">{item.quantity.toFixed(2)}</td> */}
                                    <td key="trade_button"><Link to={`/stock/${item.symbol}/confirmorder`}><Button>Trade</Button></Link></td>
                                    <td key="button">
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
                                            <tr>
                                                <td colSpan="6">
                                                    <div>
                                                        <h2>{item.longname}</h2>
                                                        <ul style={{ listStyleType: "none" }}>
                                                            <li><strong>Shares held: </strong>{item.quantity.toFixed(2)} stocks</li>
                                                            <li><strong>Current Price: </strong>${item.price.toFixed(2)}</li>
                                                            <li></li>

                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr> : null
                                    }
                                </>
                            </>
                        ))}
                    </tbody>
                </Table>
                <div>
                    <ShowPagination />
                </div>
            </Container>
        </>
    )

}

export default TableHoldings;