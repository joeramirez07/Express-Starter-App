const User = require('../models/user');

module.exports = async (req, res, next) => {
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      res.locals.user = user;
    } catch (err) {
      console.error('Error loading user:', err);
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  next();
};
