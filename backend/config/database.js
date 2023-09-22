const mongoose = require('mongoose');
const { DATABASE_URI } = process.env;

async function connectToDatabase() {
  try {
    mongoose.set('strictQuery', true);
    
    await mongoose.connect(DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      reconnectTries: 5, // Attempt to connect 5 times
    });

    console.log("You are connected to mongoose");
  } catch (error) {
    console.error("Error connecting to mongoose:", error);
    process.exit(1); // Exit the process if the database connection fails
  }

  mongoose.connection
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.error("Mongoose connection error:", error));
}

connectToDatabase();

module.exports = mongoose;