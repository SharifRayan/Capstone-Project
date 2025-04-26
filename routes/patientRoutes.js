const express = require("express");
const {
  getDonarList,
  getHospitalList,
  getOrganisationList,
  getPatientList,
} = require("../controllers/patientController");
const router = express.Router();

// Patient routes
router.get("/donar-list", getDonarList);
router.get("/hospital-list", getHospitalList);
router.get("/organisation-list", getOrganisationList);
router.get("/patient-list", getPatientList);

module.exports = router;
