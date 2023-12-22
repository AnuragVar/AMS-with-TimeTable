const express = require("express");
const InstituteLoadRouter = express.Router();
const instituteLoadController = require("../controllers/instituteloadprofile");
const InstituteLoadController = new instituteLoadController();

const TimeTabledto = require("../dto/timetable");
const TimeTableDto = new TimeTabledto();

const protectRoute =require("../../usermanagement/privateroute");

InstituteLoadRouter.post("/", async (req, res) => {
    try {
      await instituteLoadController.AddInstituteLoad(req, res);
    } catch (e) {
      res
        .status(e?.status || 500)
        .json({ error: e?.message || "Internal Server Error" });
    }
  });

 InstituteLoadRouter.get("/:session", async (req, res) => {
    try {
      await InstituteLoadController.calculateInstituteLoad(req, res);
      // res.status(200).json(sem);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

   
  module.exports = InstituteLoadRouter;