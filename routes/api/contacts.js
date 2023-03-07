const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const { contanctSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(contanctSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validation(contanctSchema),
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;

