const HttpException = require("../../../models/http-exception");
const addEvent = require("../../../models/certificateModule/addevent");

class AddEventController {
  async addEvent(req, res) {
    const newEvent = req.body;
    try {
      console.log('Request Body:', newEvent);  
      const createdEvent = await addEvent.create(newEvent);
      return createdEvent;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  }

  async getAllEvents(req, res) {
    try {
      const eventList = await addEvent.find();
      return eventList;
    } catch (e) {
      console.error(e);
  
      // Check if 'e' is an object with 'status' and 'message' properties
      const errorMessage = (e && e.status) ? e.message : "Internal server error";
      const statusCode = (e && e.status) ? e.status : 500;
  
      res.status(statusCode).json({ error: errorMessage });
    }
    }

  async getEventById(id) {
    if (!id) {
      throw new HttpException(400, "Invalid Id");
    }
    try {
      const data = await addEvent.findById(id);
      if (!data) throw new HttpException(400, "Event does not exist");
      return data;
    } catch (e) {
      throw new HttpException(500, e.message || "Internal Server Error");
    }
  }

  async updateEvent(id, eventData) {
    if (!id) {
      throw new HttpException(400, "Invalid Id");
    }
    try {
      const updatedEvent=await addEvent.findByIdAndUpdate(id, eventData);
      return updatedEvent;
    } catch (e) {
      throw new HttpException(500, e.message || "Internal Server Error");
    }
  }

  async deleteEventById(id) {
    if (!id) {
      throw new HttpException(400, "Invalid Id");
    }
    try {
      await addEvent.findByIdAndDelete(id);
    } catch (e) {
      throw new HttpException(500, e.message || "Internal Server Error");
    }
  }
}

module.exports = AddEventController;
