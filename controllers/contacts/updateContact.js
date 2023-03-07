const contactsOperations = require("../../models/contacts");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.updateContact(contactId, req.body);

  if (Object.keys(req.body).length === 0) {
    throw createError(404, "missing fields");
  }

  if (!result) {
    throw createError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = updateContact;
