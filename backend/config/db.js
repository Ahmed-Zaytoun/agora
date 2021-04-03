import mongoose from "mongoose";

//configure a function to link the db or res an error
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI_ATLAS, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
