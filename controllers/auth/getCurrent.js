const { User } = require("../../models");

const getCurrent = async (req, res) => {
  const { name, email, subscription } = req.user;
  res.json({
    ResponseBody: {
      name,
      email,
      subscription,
    },
  });
};

module.exports = getCurrent;
