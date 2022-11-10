import { Table, Container, Button } from "react-bootstrap";

function TableHoldings() {
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
                        <tr>
                            <th scope="row">logo</th>
                            <td>MSFT</td>
                            <td>$40</td>
                            <td><Button>Trade</Button></td>
                        </tr>
                        <tr>
                            <th scope="row">logo</th>
                            <td>AMZN</td>
                            <td>$60</td>
                            <td><Button>Trade</Button></td>
                        </tr>
                        <tr>
                            <th scope="row">logo</th>
                            <td>CHAD</td>
                            <td>$20</td>
                            <td><Button>Trade</Button></td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </>
    )

}

export default TableHoldings;