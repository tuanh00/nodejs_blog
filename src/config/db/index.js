const mongoose = require('mongoose');

mongoose.set('strictQuery', true);  // or false if you want the future v7 default

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/f8_education_dev", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect OK");
  } catch (error) {
    console.log("Database connection error:", error);
  }
}

module.exports = { connect };
