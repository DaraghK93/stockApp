function errorHandler(err, req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  if (res.status === 200){
    res.status = 500
  }
  console.log(res.errormessage)
  res.json({
    errormessage: res.errormessage,
  });
}

module.exports = {
  errorHandler,
};