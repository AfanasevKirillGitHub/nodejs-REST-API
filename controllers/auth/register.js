const { User } = require("../../models");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`Email "${email}" in use`);
  }

  const avatarURL = gravatar.url(email);

  const verificationToken = uuidv4();
  const newUser = new User({ name, email, avatarURL, verificationToken });

  newUser.setPassword(password);

  await newUser.save();

  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    ResponseBody: {
      name,
      email,
      avatarURL,
      subscription: "starter",
      verificationToken,
    },
  });
};

module.exports = register;
