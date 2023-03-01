//express app router
const express = require("express");
const {
  createCar,
  getAllCars,
  getOneCar,
  deleteCar,
  updateCar,
  updateAllCars,
  getByYear,
} = require("../controllers/carControllers");
const router = express.Router();

// GET all cars
router.get("/", getAllCars);

// GET a single cars
router.get("/:id", getOneCar);

// POST a new car
router.post("/", createCar);

// DELETE a car
router.delete("/:id", deleteCar);

// GET older cars
router.get("/overFive", getByYear);

// UPDATE a car
router.put("/update/:id", updateCar);

// UPDATE all cars
router.put("/updateAll", updateAllCars);

module.exports = router;
