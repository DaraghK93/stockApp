import { Card, Col, Container } from "react-bootstrap";

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

    return (
        <>
            <Card>
            <div className="holdingCard">
                    <Col>
                        <h2 className="cardTitle">Transaction History</h2>
                    </Col>
                </div>
                <br />
                <Container>
                    <span>PENDING || COMPLETED || CANCELLED</span>
                    <p>table here</p>
                </Container>
            </Card>
        </>
    )
}

export default TransactionHistory;