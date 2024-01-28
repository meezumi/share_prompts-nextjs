import mongoose from 'mongoose';

let isConnected = false; 
// for tracking the connection 

export const connectToDB = async () => {
  mongoose.set("strictQuery", true); // this sets the mongoose options, avoiding errors

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  } // if not connected

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
}