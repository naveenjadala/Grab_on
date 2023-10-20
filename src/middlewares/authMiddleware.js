const Joi = require("joi");

const validateAuthInput = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      if (error.details[0].path[0] === "password") {
        return res
          .status(400)
          .json({ error: "Enter a valid Password" });
      }
      return res
        .status(400)
        .json({ error: error.details[0].message });
    }
    next();
  };
};

module.exports = { validateAuthInput };
