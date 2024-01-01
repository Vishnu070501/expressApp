// routes/shows.js
const express = require('express');
const router = express.Router();
const Show = require("../models/show")
const Ticket = require('../models/ticket')
const User = require("../models/user")
const showService = require('../Services/showService');
// Get all shows (this here uses sequelize as the connection)
router.get('/getAllShows', async (req, res) => {
  try {
    const showsWithTickets = await showService.getAllShowsWithTickets();
    res.json(showsWithTickets);
  } catch (error) {
    console.error('Error in homeController:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }    
});
// Create a new show
router.post('/postShow', async (req, res) => {
  try {
        // Assuming req.body contains the data for the new show
        const newShow = await showService.createShow(req.body);
        // Send a response indicating success
        res.status(201).json(newShow);    
  } catch (error) {
    console.error('Error creating show:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.delete("/delete/:id", async (req,res) => {
  const showId = parseInt(req.params.id, 10); // Parse the ID from the request params

  try {
    // Find the show by ID in the database
    const showToDelete = await Show.findByPk(showId);

    if (showToDelete) {
      // Delete the show
      await showToDelete.destroy();
      res.status(200).json({ message: 'Show deleted successfully', deletedShow: showToDelete });
    } else {
      res.status(404).json({ error: 'Show not found' });
    }
  } catch (error) {
    console.error('Error deleting show:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.put("/updateShow", async (req,res) => {
  const id = req.query.id;
  let newShow = req.body;
  try{
    newShow =await showService.updateShow(id,newShow);
    return res.status(200).json({ message: 'Show updated successfully', newShow });
  }catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports = router;
