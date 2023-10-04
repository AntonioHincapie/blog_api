module.exports = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
    },
    user_id: {
      type: 'integer',
    },
    post_id: {
      type: 'integer',
    },
  },
  required: ['user_id', 'post_id'],
  additionalProperties: false,
};
