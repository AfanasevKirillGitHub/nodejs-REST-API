const { Contact } = require("../../models");
const createError = require("http-errors");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw createError(404, "Not found");
  }

  res.status(200).json({ message: "contact deleted" });
};

module.exports = removeContact;
