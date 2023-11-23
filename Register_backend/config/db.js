const mongoose = require("mongoose");
// URI
const uri = "mongodb+srv://ohjunsoo13:jeu5LDgM6J4vfWYZ@cluster0.chyhsl6.mongodb.net/?retryWrites=true&w=majority";

// Connect MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(uri);

    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;