const jwt = require('jsonwebtoken');
const checkToken = (req, res, next) => {
  try {
    console.log('middleware worked');
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(404).jons({ message: 'you are not authorized' });
    }
    const token = bearerToken.split(' ')[1];
    const ismatching = jwt.verify(token, process.env.SECRET_KEY);
    console.log(ismatching);

    next();
  } catch (error) {
    return res.status(403).json({ message: 'you are not authorized' });
  }
};

module.exports = checkToken;
