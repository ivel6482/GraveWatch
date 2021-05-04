const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer"); // ????
const personsController = require("../controllers/persons");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get('/', personsController.getAllPersons)

router.post("/createPerson", ensureAuth, upload.single('file'), personsController.createPerson); // this is what is attaching from route/persons/createPerson

router.get("/:id", personsController.getPersonById); // /persons/:id
router.put("/:id", personsController.getPersonById); // /persons/:id

router.get("/updatePerson/:id", ensureAuth, personsController.getUpdate)
router.put("/updatePerson/:id", ensureAuth, personsController.putPerson)

router.delete("/deletePerson/:id", ensureAuth, personsController.deletePerson);//this is dynaic :id is a place holder

module.exports = router; 