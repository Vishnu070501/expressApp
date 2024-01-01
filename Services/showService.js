// showService.js
// showService.js
const path = require('path');
const User = require('../models/user');
const Show = require('../models/show');
const Ticket = require('../models/ticket');

const showService = {
  getAllShowsWithTickets: async () => {
    try {
      const showsWithTickets = await Show.findAll({
        include: [
          {
            model: Ticket,
            include: User, // Include the User model for each Ticket
          },
        ],
      });

      return showsWithTickets;
    } catch (error) {
      console.error('Error fetching shows:', error);
      throw new Error('Internal Server Error');
    }
  },
  createShow: async (showData) => {
    try {
      const newShow = await Show.create(showData);
      // Create 20 tickets for the new show with seat numbers A1 to A20
      const tickets = [];
      for (let i = 1; i <= 20; i++) {
        const seatNumber = `A${i}`;
        const ticketData = {
          seatNo: seatNumber,
          price: 200,
          showId: newShow.id,
          bookedBy: null,
        };
        const newTicket = await Ticket.create(ticketData);
        tickets.push(newTicket);
      }

      return { newShow, tickets };
    } catch (error) {
      console.error('Error creating show:', error);
      throw new Error('Internal Server Error');
    }
  },
  updateShow: async (showId,newShow) => {
    try{
      // conventional way to update(very slow)
    //   let oldShow = await Show.findByPk(id);
      // Update properties directly on the existing object
    // oldShow.movieName = newShow.movieName;
    // oldShow.showDate = newShow.showDate;
    // oldShow.showTime = newShow.showTime;
    // await oldShow.save();
    // return oldShow;
    // Check if the show with the specified ID exists
    let existingShow = await Show.findByPk(showId);

    // if (!existingShow) {
    //   throw new Error('Show not found');
    // }
      const [numUpdated, updatedShows] = await Show.update(newShow, {
        where: { id: showId },
        returning: true, // This makes sure the returned result is the updated record
        plain: true,     // This ensures that only the updated record is returned
      });
      // console.log("updated:",updatedShows);
      // if (numUpdated > 0) {
      //   return updatedShows;
      // } else {
      //   throw new Error('error updatin show');
      existingShow = {...newShow}
      
      // }
      return existingShow
    }catch(error){
      console.log("error:", error.message);
      // console.log("error saving the object.");
      // throw new Error('Internal Server Error');
    }
  }
  // Add more service functions as needed
};

module.exports = showService;
