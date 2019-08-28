const jwt = require("jsonwebtoken");

function verify(res, req, next) {
   const token = req.header("auth-token");
   if (!token) return res.status(401).send("Access denied");

   try {
      const checkToken = jwt.verify(token, process.env.USER_TOKEN);
      req.user = checkToken;
   } catch (err) {
      res.status(400).send("Invalid token");
   }
   next();
}

module.exports = verify;
