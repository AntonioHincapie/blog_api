const Ajv = require('ajv').default,
  AJV_OPTS = { allErrors: true, coerceTypes: true, useDefaults: true };

module.exports = {
  validate: (schema) => {
    if (!schema) {
      throw new Error('Schema is required');
    }
    const ajv = new Ajv(AJV_OPTS);
    const validate = ajv.compile(schema);
    return (req, res, next) => {
      const valid = validate(req.body);
      if (!valid) {
        return res.status(400).json({
          status: false,
          message: `Schema validation error: ${ajv.errorsText(
            validate.errors
          )}`,
        });
      }
      next();
    };
  },
};
