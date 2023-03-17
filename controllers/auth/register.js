const { User } = require("../../models");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`Email "${email}" in use`);
  }

  const avatarURL = gravatar.url(email);

  const newUser = new User({ name, email, avatarURL });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    ResponseBody: {
      name,
      email,
      avatarURL,
      subscription: "starter",
    },
  });
};

module.exports = register;
