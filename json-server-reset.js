module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/reset') {
    const todos = []
    req.app.db.setState({ todos });

    return res.status(200).send(todos);
  }

  next();
};
