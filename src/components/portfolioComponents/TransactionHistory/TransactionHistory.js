import { Card, Col, Container, Table, Button } from "react-bootstrap";

function TransactionHistory() {
    // const transactions =[
    //     {
    //         portfolioId: { type: Schema.Types.ObjectId, ref: 'portfolioData', required: true },
    //         stockId: { type: Schema.Types.ObjectId, ref: 'stock', required: true }, // returns entire stock object
    //         holdings: { type: Schema.Types.ObjectId, ref: 'holdings', required: true }, //
    //         units: { type: Number, trim: true, required: true },
    //         value: { type: Number, trim: true, required: true },
    //         date: "04-12-2022",
    //         buyOrSell: { type: String, enum: ["BUY", "SELL"], trim: true, required: true },
    //         orderType: { type: String, enum: ["MARKET", "LIMIT"], trim: true, required: true },
    //         status: "PENDING" ,
    //         tradingFee: { type: Number },
    //         limitValue: { type: Number }
    //     },
    //     {
    //         portfolioId: { type: Schema.Types.ObjectId, ref: 'portfolioData', required: true },
    //         stockId: { type: Schema.Types.ObjectId, ref: 'stock', required: true }, // returns entire stock object
    //         holdings: { type: Schema.Types.ObjectId, ref: 'holdings', required: true }, //
    //         units: { type: Number, trim: true, required: true },
    //         value: { type: Number, trim: true, required: true },
    //         date: "04-12-2022",
    //         buyOrSell: { type: String, enum: ["BUY", "SELL"], trim: true, required: true },
    //         orderType: { type: String, enum: ["MARKET", "LIMIT"], trim: true, required: true },
    //         status:  "COMPLETED" ,
    //         tradingFee: { type: Number },
    //         limitValue: { type: Number }
    //     },
    //     {
    //         portfolioId: { type: Schema.Types.ObjectId, ref: 'portfolioData', required: true },
    //         stockId: { type: Schema.Types.ObjectId, ref: 'stock', required: true }, // returns entire stock object
    //         holdings: { type: Schema.Types.ObjectId, ref: 'holdings', required: true }, //
    //         units: { type: Number, trim: true, required: true },
    //         value: { type: Number, trim: true, required: true },
    //         date: "04-12-2022",
    //         buyOrSell:  ["BUY", "SELL"], 
    //         orderType: { type: String, enum: ["MARKET", "LIMIT"], 
    //         status: "CANCELLED" ,
    //         tradingFee: { type: Number },
    //         limitValue: { type: Number }
    //     }]

    const columns =[
        { label: "Logo", accessor: "", sortable: false, showHeader: true },
        { label: "Ticker", accessor: "", sortable: true, showHeader: true },
        { label: "Buy/Sell", accessor: "", sortable: true, sortbyOrder: "", showHeader: true },
        { label: "Value", accessor: "", sortable: true, sortbyOrder: "", showHeader: true },
        { label: "Order Type", accessor: "", sortable: true, sortbyOrder: "", showHeader: true },
        { label: "Date", accessor: "", sortable: true, sortbyOrder: "", showHeader: true },
        { label: "Fee", accessor: "", sortable: true, sortbyOrder: "", showHeader: true },
        { label: "Units", accessor: "", sortable: true, sortbyOrder: "", showHeader: true },
        { label: "Stock Price", accessor: "", sortable: true, sortbyOrder: "", showHeader: true }
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
                    <Button>Pending</Button> <Button>Completed</Button> <Button>Cancelled</Button>
                    <Table style={{ borderCollapse: "collapse" }}>
                        <thead>
                            <tr key="cols">
                                {columns.map(({ label, accessor, sortable, showHeader, sortbyOrder }) => {
                                    return <th
                                        key={accessor}
                                    ><strong>{label}</strong>
                                    </th>;
                                })}
                            </tr>
                        </thead>
                        </Table>
                </Container>
            </Card>
        </>
    )
}

export default TransactionHistory;