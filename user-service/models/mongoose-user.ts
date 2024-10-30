import mongoose, { Document, Schema } from "mongoose";

export interface MongooseUser extends Document {
  username: string,
  password: string
}

const userSchema =  new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
}, {timestamps: true})

export const mongooseUser = 
mongoose.model<MongooseUser>("User", userSchema) 

