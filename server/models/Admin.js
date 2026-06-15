const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  bannerImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200'
  },
  categories: {
    type: [String],
    default: ['bracelets', 'necklaces', 'earrings', 'rings', 'mobiles', 'appliances']
  }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);