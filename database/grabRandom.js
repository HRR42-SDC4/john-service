/* eslint-disable no-param-reassign */
const randomId = (context, events, next) => {
  const id = Math.floor((Math.random() * 1000000) + 9000001);
  context.vars.id = id;
  next();
};

module.exports = { randomId };
