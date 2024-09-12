import mongoose from "mongoose"

export async function mongooseconnect() {
  mongoose.connection
    .on("error", err => console.log("ERROR: Connection to MongoDB failed.", err))
    .once("open", () => console.log("MongoDB onnection open"))
  
  await mongoose.connect(process.env.MONGO_DB_URL ?? "");
}