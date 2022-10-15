const jwt = require("jsonwebtoken");

// const isAuth = async (req, res, next) => {
//   const { authorization } = req.headers;
//   if (authorization) {
//     // Bearer xxx => xxx
//     const token = authorization.slice(7, authorization.length);
//     jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
//       if (err) {
//         res.status(401).json({ message: "Access Denied" });
//       } else {
//         req.user = decode;
//         next();
//       }
//     });
//   } else {
//     res.status(401).json({ message: "Access Denied" });
//   }
// };

 const isAdmin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    // Bearer xxx => xxx
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Access Denied" });
      } else {
        req.admin = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "Access Denied" });
  }
};


module.exports = isAdmin