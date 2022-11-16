import { Table, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function TableHoldings({ data }) {
    return (
        <>
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Ticker</th>
                            <th scope="col">Value</th>
                            <th scope="col">Qty</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr key={i}>
                                <td><Link to={`/stock/${item.stock.symbol}`}><img src={item.stock.logo} style={{ width: "5rem" }} alt="company logo"></img></Link></td>
                                <td>{item.stock.symbol}</td>
                                <td>${item.stock.daily_change.currentprice}</td>
                                <td>{item.quantity}</td>
                                <td><Link to={`/stock/${item.stock.symbol}/confirmorder`}><Button>Trade</Button></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    )

}

export default TableHoldings;