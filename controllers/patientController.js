const userModel = require("../models/userModel");

// get all donors data
const getDonarList = async (req, res) => {
  try {
    const donarData = await userModel
      .find({ role: "donar" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Donar data fetched successfully ",
      donarData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in donar List API",
      error,
    });
  }
};

// get all hospital data
const getHospitalList = async (req, res) => {
  try {
    const hospitalData = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });
    console.log(hospitalData);
    return res.status(200).send({
      success: true,
      message: "hospital data fetched successfully",
      hospitalData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in hospital List API",
      error,
    });
  }
};

// get all organization data
const getOrganisationList = async (req, res) => {
  try {
    const organizationData = await userModel
      .find({ role: "organisation" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "organization data fetched successfully ",
      organizationData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in organization List API",
      error,
    });
  }
};

const getPatientList = async (req, res) => {
  try {
    const patients = await userModel.find({ role: "patient" });
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDonarList,
  getHospitalList,
  getOrganisationList,
  getPatientList,
};
