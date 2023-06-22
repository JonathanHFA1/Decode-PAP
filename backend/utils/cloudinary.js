const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dxhr0rmvm', 
    api_key: '521263998198714', 
    api_secret: 'g-DozG6wl2hjxaS2gGx1Sl7RcvU' 
  });

module.exports = cloudinary;