import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("CONNECTED TO MONGO DB");
  } catch (err) {
    console.log("ERROR CONNECTING TO MONGO DB");
    console.log(err);
  }
};
