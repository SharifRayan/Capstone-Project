const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// CREATE INVENTORY
const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType, bloodGroup, quantity, userId } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found. Please enter a valid email address.",
      });
    }

    if (inventoryType === "out" && user.role !== "hospital") {
      return res.status(403).send({
        success: false,
        message: "Only hospitals can create 'out' type inventory records.",
      });
    }

    const organisation = new mongoose.Types.ObjectId(userId);
    let totalIn = 0,
      totalOut = 0;

    if (inventoryType === "out") {
      const results = await Promise.all([
        inventoryModel.aggregate([
          { $match: { organisation, inventoryType: "in", bloodGroup } },
          { $group: { _id: null, total: { $sum: "$quantity" } } },
        ]),
        inventoryModel.aggregate([
          { $match: { organisation, inventoryType: "out", bloodGroup } },
          { $group: { _id: null, total: { $sum: "$quantity" } } },
        ]),
      ]);

      totalIn = results[0][0]?.total || 0;
      totalOut = results[1][0]?.total || 0;
      const availableQuantity = totalIn - totalOut;

      if (availableQuantity < quantity) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuantity} ML of ${bloodGroup.toUpperCase()} is available.`,
        });
      }

      req.body.hospital = user._id;
    } else if (inventoryType === "in" && user.role === "donar") {
      req.body.donar = user._id;
    }

    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New record created successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
};

// GET ALL OUT BLOOD RECORDS consumers
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get hospitals consumers records successfully",
      inventory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "error in get consumer inventory",
      error,
    });
  }
};

// GET ALL BLOOD RECORDS
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "error in get all inventory",
      error,
    });
  }
};

// GET RECENT INVENTORY
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .limit(3)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Recent inventory data fetched successfully.",
      inventory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in recent inventory API",
      error,
    });
  }
};

// GET DONOR RECORDS
const getDonarsController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    const donarIds = await inventoryModel.distinct("donar", { organisation });
    const donars = await userModel.find({ _id: { $in: donarIds } });
    return res.status(200).send({
      success: true,
      message: "Donor records fetched successfully",
      donars,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching donor records",
      error,
    });
  }
};

// GET HOSPITAL RECORDS
const getHospitalsController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    const hospitalIds = await inventoryModel.distinct("hospital", {
      organisation,
    });
    const hospitals = await userModel.find({ _id: { $in: hospitalIds } });
    return res.status(200).send({
      success: true,
      message: "Hospital records fetched successfully",
      hospitals,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching hospital records",
      error,
    });
  }
};

// GET ORGANISATION RECORDS
const getOrganisationController = async (req, res) => {
  try {
    const donar = req.body.userId;
    const organisationIds = await inventoryModel.distinct("organisation", {
      donar,
    });
    const organisations = await userModel.find({
      _id: { $in: organisationIds },
    });
    return res.status(200).send({
      success: true,
      message: "Organisation records fetched successfully",
      organisations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching organisation records",
      error,
    });
  }
};

// GET ORGANISATION FOR HOSPITAL RECORDS
const getOrganisationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const organisationIds = await inventoryModel.distinct("organisation", {
      hospital,
    });
    const organisations = await userModel.find({
      _id: { $in: organisationIds },
    });
    return res.status(200).send({
      success: true,
      message: "Organisation records for hospital fetched successfully",
      organisations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching organisation records for hospital",
      error,
    });
  }
};

// GET ALL ORGANIZATIONS
const getAllOrganisationsController = async (req, res) => {
  try {
    const organisations = await userModel.find({ role: "organisation" });
    return res.status(200).send({
      success: true,
      message: "All organizations fetched successfully",
      organisations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching all organizations",
      error,
    });
  }
};


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


module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalsController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
  getAllOrganisationsController,
  getDonarList 
};
