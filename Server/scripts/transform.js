module.exports.transformUser = function (doc, ret, options) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.password;
  delete ret.__v;
  return ret;
};

module.exports.transform = function (doc, ret, options) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};
