const jwt = require('jsonwebtoken');
const checkToken = roles => {
  return (req, res, next) => {
    try {
      console.log('middleware worked');
      const bearerToken = req.headers.authorization;
      if (!bearerToken) {
        return res.status(404).jons({ message: 'you are not authorized' });
      }
      const token = bearerToken.split(' ')[1];
      const ismatching = jwt.verify(token, process.env.SECRET_KEY);
      console.log(ismatching);
      if (!roles.includes(ismatching.role)) {
        return res.status(500).json({ message: 'you are not authorized' });
      }

      next();
    } catch (error) {
      return res.status(403).json({ message: 'you are not authorized exit' });
    }
  };
};

module.exports = checkToken;
