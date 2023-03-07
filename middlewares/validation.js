const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (Object.keys(req.body).length === 0) {
      const error = new Error("missing fields");
      error.status = 400;
      next(error);
    }

    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

module.exports = validation;
