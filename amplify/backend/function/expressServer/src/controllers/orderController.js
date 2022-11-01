const Order = require('../models/order.model')

const createOrder = async (req, res, next) => {
    try {
       
        const newOrder = new Order({
          portfolioID: req.body.portfolioID,
          symbol: req.body.symbol,
          limitPrice: req.body.limitPrice,
          quantity: req.body.quantity,
          orderType: req.body.orderType

        });
       await Order.save()
            .populate("portfolioID") 
          
        res.json({ newOrder });
      } catch (err) {
        console.error(err.message);
        res.errormessage = 'Server error';
        return next(err);
      }
    }
  
  module.exports = {
    createOrder
  }
  