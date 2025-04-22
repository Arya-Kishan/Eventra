import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("CONNECTED TO MONGO DB LOCAL");
        })
        .catch((err) => {
            console.log("ERROR IN CONNECTING MONGO DB LOCAL");
            console.log(err);
        })
}