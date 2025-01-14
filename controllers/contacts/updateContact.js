const { Contact } = require("../../models");
const createError = require("http-errors");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (Object.keys(req.body).length === 0) {
    throw createError(404, "missing fields");
  }

  if (!result) {
    throw createError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = updateContact;
