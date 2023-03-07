const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getById = async (contactId) => {
  const data = await listContacts();

  const result = data.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const addContact = async (body) => {
  const data = await listContacts();

  const newContact = { ...body, id: v4() };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return newContact;
};

const removeContact = async (contactId) => {
  const data = await listContacts();

  const idx = data.findIndex((item) => item.id == contactId);
  if (idx === -1) {
    return null;
  }

  const deleteContact = data.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(deleteContact));
  return data[idx];
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const idx = data.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  data[idx] = { ...body, id: contactId };
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return data[idx];
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
