import { Table, Container, Button } from "react-bootstrap";

function TableHoldings({ data }) {
    return (
        <>
            <Container>
                <Table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Balance:</th>
                            <th scope="col">$50</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr key={i}>
                                <td scope="row"><img src={item.stock.logo} style={{ width: "2rem" }}></img></td>
                                <td>{item.stock.symbol}</td>
                                <td>{item.stock.daily_change.currentprice}</td>
                                <td>{item.quantity}</td>
                                <td><Button>Trade</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    )

}

export default TableHoldings;