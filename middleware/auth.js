const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
   const token = req.header("auth-token");
   if (!token) return res.status(401);

   try {
      const checkToken = jwt.verify(token, process.env.USER_TOKEN);
      res.user = checkToken;
   } catch (err) {
      return res.status(400).json("invalid or expired token");
   }
   next();
};

// module.exports = verify;
//.json("Invalid token")
//.json("Access denied")
