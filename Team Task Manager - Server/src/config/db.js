import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb Connected");
  } catch (err) {
    console.error(err.stack);
    process.exit(1);
  }
};

export default connectDB;
