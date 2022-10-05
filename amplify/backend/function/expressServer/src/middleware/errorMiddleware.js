function errorHandler(err, req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  console.log(res.errormessage)
  res.json({
    errormessage: res.errormessage,
  });
}

module.exports = {
  errorHandler,
};
