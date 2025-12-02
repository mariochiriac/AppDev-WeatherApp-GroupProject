// routes/weather.js
const express = require("express");
const router = express.Router();

// GET /api/curweather?zip=<zip>
// fake data 
// plug in a real weather API 
router.get("/curweather", (req, res) => {
  const zip = req.query.zip;

  if (!zip) {
    return res.status(400).json({ message: "Missing zip parameter." });
  }

  const fakeWeather = {
    locationName: `Demo City (${zip})`,
    temperature: 72,
    humidity: 50,
    description: "clear sky (demo data)",
  };

  return res.status(200).json(fakeWeather);
});

module.exports = router;
