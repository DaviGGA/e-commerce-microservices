import mongoose, { Document, Schema } from "mongoose";

interface MongooseProduct extends Document {
  name: string,
  price: number,
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema =  new Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
}, {timestamps: true})

export const mongooseProduct = 
mongoose.model<MongooseProduct>("Product", productSchema) 

