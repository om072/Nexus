import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from 'body-parser'
import {Booking, Center} from "./src/models/index.js";
import { ObjectId } from 'mongodb'; 
const app = express();


app.use(cors()); 
app.use(express.json());
app.use(bodyParser.json()); 
app.use(express.urlencoded({extended: true}))

mongoose.connect('mongodb+srv://omKhangat:omkhangat1234@cluster0.xbzd6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB:', err));

app.get('/getBookings', async (req, res) => {
  const { date, sport, center } = req.query;
  console.log("query",sport)

  try {
    const query = {};

    if (date) query.date = date;
    // if (sport) query.sport = sport;
    if(sport) query.sport = new ObjectId(sport);
    if (center) query.center = center.name;

    console.log("query",query)

    const filteredBookings = await Booking.find(query).populate('sport')   
    
    console.log("booking",filteredBookings)

    return res.status(200).json(filteredBookings);
  }
  catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve bookings' });
  }
});


app.post('/createBooking', async (req, res) => {
  const { date, time, email, sport, center, court } = req.body;

  try {
    const overlappingBooking = await Booking.findOne({
      date,
      time,
      court,
      center,
      sport
    });

    if (overlappingBooking) {
      return res.status(400).json({ error: 'This time slot is already booked.' });
    }

    const newBooking = new Booking({ date, time, email, sport, center, court });
    await newBooking.save();

    return res.status(201).json({ message: 'Booking added successfully!', booking: newBooking });
  }
  catch(err) {
    return res.status(500).json({ error: 'Failed to create booking' });
  }
});

app.get('/getTotalBookings', async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          uniqueUsers: { $addToSet: "$email" } 
        }
      },
      {
        $project: {
          _id: 0, 
          totalBookings: 1,
          totalUniqueUsers: { $size: "$uniqueUsers" } 
        }
      }
    ]);
    const data = result.length > 0 ? result[0] : { totalBookings: 0, totalUniqueUsers: 0 };

    return res.status(200).json(data);
 
  }
  catch(err){
    return res.status(500).json({ error: 'Failed to fetch total booking' });
  }
})

app.get('/recentBooking', async (req, res) => {
  try {
    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
    const recentBookings = await Booking.find({
      createdAt: { $gte: sixHoursAgo }  
    }).sort({ createdAt: -1 }).populate('sport')        
    .populate('court');  

    return res.status(200).json(recentBookings);
  }
  catch(err){
    return res.status(500).json({ error: 'Failed to fetch recent booking'});
  }
})


app.get('/getCenters', async (req, res) => {
  try {

    const centers = await Center.find()
      .populate({
        path: 'sports',
        populate: {
          path: 'courts', 
        },
      });

    return res.status(200).json(centers);
  } catch (error) {
    console.error('Error fetching centers:', error);
    return res.status(500).json({ message: 'Server error, could not fetch centers' });
  }
});

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
