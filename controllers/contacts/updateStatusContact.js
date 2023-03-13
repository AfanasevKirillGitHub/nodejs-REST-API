const { Contact } = require("../../models");
const createError = require("http-errors");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (!result) {
    throw createError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = updateStatusContact;
