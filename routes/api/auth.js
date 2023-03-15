const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
module.exports = router;

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

router.post("/current", auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;