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
  required: ['title', 'content', 'user_id'],
  additionalProperties: false,
};
