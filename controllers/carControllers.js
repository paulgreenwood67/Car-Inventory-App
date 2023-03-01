const Car = require("../models/carModel");
const mongoose = require("mongoose");

//get all cars
const getAllCars = async (req, res) => {
  const cars = await Car.find({});

  res.status(200).json(cars);
};

//Get older cars
const getByYear = (req, res) => {
  Car.find({ year: { $lt: 2018 } }, function (err, test) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "An error occurred while retrieving the cars." });
      console.log("findAll error");
    } else {
      res.send(test);
      console.log("find 5 year");
    }
  });
}

//get single car
const getOneCar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such car" });
  }
  const car = await Car.findById(id);

  if (!car) {
    return res.status(404).json({ error: "No such car" });
  }
  res.status(200).json(car);
};

//create new car
const createCar = async (req, res) => {
  const { make, model, year, registration, owner } = req.body;

  let emptyFields = [];

  if (!make) {
    emptyFields.push("make");
  }
  if (!model) {
    emptyFields.push("model");
  }
  if (!year) {
    emptyFields.push("year");
  }
  if (!registration) {
    emptyFields.push("registration");
  }
  if (!owner) {
    emptyFields.push("owner");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const car = await Car.create({ make, model, year, registration, owner });
    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete car
const deleteCar = async (req, res) => {
  const { id } = req.params;
  // checks the id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such car" });
  }

  const car = await Car.findOneAndDelete({ _id: id });
  if (!car) {
    return res.status(404).json({ error: "No such car" });
  }
  res.status(200).json(car);
};

//update car
const updateCar = (req, res) => {
  let query = req.body;
  const { car_id } = req.params;
  let filter = { _id: req.params };
  console.log("filter", filter);
  console.log("filter.id", filter._id.id);

  Car.findOneAndUpdate(
    filter.id,
    {
      make: query.make,
      model: query.model,
      year: query.year,
      registration: query.registration,
      owner: query.owner,
    },
    //returns new updated data = new:true
    { new: true },
    function (err) {
      if (err) {
        console.log("Something wrong when updating data!", err);
      }
      res.send({
        message: `Car with id ${filter._id.id} updated succefully`,
      });
    }
  );
};

const updateAllCars = (req, res) => {
  let query = req.body;
  let filter = { Model: { $lt: 2023 } };

  Car.updateMany(
    filter,
    {
      make: query.make,
      model: query.model,
      year: query.year,
      registration: query.registration,
      owner: query.owner,
    },
    //returns new updated data = new:true
    { new: true },
    function (err) {
      if (err) {
        console.log("Something wrong when updating data!");
        res.send("ERROR: Not Updated. " + err);
      }
      res.send({
        message: `Cars updated succefully`,
      });
    }
  );
};

// exports.updateByOwner = function (req, res) {
//     let query = req.body;
//     let filter = { _id: req.body.id };

//     Cars.findOneAndUpdate(
//       filter,
//       {
//         Owner: query.Owner,
//         Make: query.Make,
//         Model: query.Model,
//         RegistrationNumber: query.RegistrationNumber,
//         Address: query.Address,
//       },
//       //returns new updated data = new:true
//       { new: true },
//       function (err) {
//         if (err) {
//           console.log("Something wrong when updating data!");
//           res.send("ERROR: Not Updated. " + err);
//         }
//         res.send({
//           message: `Car with id ${car_id} updated succefully`,
//         });
//       }
//     );
//   };

//update all cars
// const updateAllCars = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "No such car" });
//   }
//   const car = await Car.find({});
//   res.status(200).json(car);
// };

module.exports = {
  createCar,
  getAllCars,
  getOneCar,
  deleteCar,
  updateCar,
  getByYear,
  updateAllCars,
};
