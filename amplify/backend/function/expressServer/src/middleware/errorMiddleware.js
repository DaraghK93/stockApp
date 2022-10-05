function errorHandler(err, req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.json({
    errormessage: res.errormessage,
  });
  console.log(errormessage);
}

module.exports = {
  errorHandler,
};
