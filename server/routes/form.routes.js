const express = require("express");

const router = new express.Router();

const Forms = require("../controllers/form.controllers");
const upload = require("../multer")

module.exports = app => {
    router.post("/submitForm",upload.any(),Forms.submitForm);
   
    app.use("/api",router);
}