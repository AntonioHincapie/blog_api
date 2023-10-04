module.exports = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    content: {
      type: 'string',
    },
    user_id: {
      type: 'integer',
    },
  },
  required: ['user_id'],
  additionalProperties: false,
};
