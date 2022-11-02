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
    //    await newOrder.save().then(result => {
    //     Order 
    //         .populate(newOrder, {path: 'portfolioID'})
    //         .then(result => { 
    //             
    //         })
    //    })
          await newOrder.save()
          res.json({ newOrder })
      } catch (err) {
        console.error(err.message);
        res.errormessage = 'Server error';
        return next(err);
      }
    }
  
const getOrders = async (req, res, next) => { 
    try {
        // get all their details except their password
        const orders = await Order.find()
            .populate('portfolioID')
            // .exec()

        if (!orders) {
        res.status(400)
        res.errormessage = 'There is no such order'
        return next(new Error('No order'))
        }

        res.json(orders)
    } catch (err) {
        console.error(err.message)
        res.errormessage = 'Server error in getallorders'
        return next(err)
      }

    }

  module.exports = {
    createOrder,
    getOrders
  }
  