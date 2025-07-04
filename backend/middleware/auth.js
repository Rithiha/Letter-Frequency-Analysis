const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).send({ message: "Token missing" });
  try {
    const user = jwt.verify(token, "secret");
    console.log(user);
    if (user.id) {
      req.user = user.id;
    }
    // req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ message: "Invalid token" });
  }
};
