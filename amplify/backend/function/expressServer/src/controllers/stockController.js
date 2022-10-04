

// @desc get individual stock price
// @route GET /api/stock/price/:name
// @access Public

const getStockPrice = (req,res) => {
    res.json({ message: 'The stock price is 200' })
}


module.exports = {
    getStockPrice
} 