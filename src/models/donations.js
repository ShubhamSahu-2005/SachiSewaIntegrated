const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  
  fundraiserId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fundraiser', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true }, // Optional for anonymous donations
  donorName: { type: String, default: 'Anonymous' },
  amount: { type: Number, required: true },
  message: { type: String },


 
  donationDate: { type: Date, default: Date.now },
});

const Donation = mongoose.models.Donation || mongoose.model('Donation', donationSchema);

export default Donation;
