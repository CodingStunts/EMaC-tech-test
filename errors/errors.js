exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send(err.msg);
  } else next(err);
};

exports.handleServerErrors = (err, req, res) => {
  res.status(500).send({ msg: "Internal server error!" });
};
