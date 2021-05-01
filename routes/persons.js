const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer"); // ????
const personsController = require("../controllers/persons");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now


router.get("/:id", ensureAuth, personsController.getPersonById); // /persons/:id

router.post("/createPerson",  personsController.createPerson); // this is what is attaching from route/persons/createPerson

router.get('/', personsController.getAllPersons)

// router.put("/:id", personsController.updatePerson) TODO later

router.delete("/deletePerson/:id", personsController.deletePerson);//this is dynaic :id is a place holder


module.exports = router;