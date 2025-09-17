function authorizeRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }
    next();
  };
}

export default authorizeRole;
