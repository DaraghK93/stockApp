function TransactionHistory() {
    const transactions =
        [{
            portfolioId: { type: Schema.Types.ObjectId, ref: 'portfolioData', required: true },
            stockId: { type: Schema.Types.ObjectId, ref: 'stock', required: true },
            holdings: { type: Schema.Types.ObjectId, ref: 'holdings', required: true },
            units: { type: Number, trim: true, required: true },
            value: { type: Number, trim: true, required: true },
            date: "04-12-2022",
            buyOrSell: { type: String, enum: ["BUY", "SELL"], trim: true, required: true },
            orderType: { type: String, enum: ["MARKET", "LIMIT"], trim: true, required: true },
            status: { type: String, enum: ["PENDING", "COMPLETED", "CANCELLED"], trim: true },
            tradingFee: { type: Number },
            limitValue: { type: Number }
        },
        ]
    return (
        <>
        </>
    )
}

export default TransactionHistory;