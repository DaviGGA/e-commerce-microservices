import mongoose, { Document, Schema } from "mongoose";

export interface MongooseProduct extends Document {
  name: string,
  price: number,
  quantity: number,
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema =  new Schema({
  name: {type: String, required: true, unique: true},
  price: {type: Number, required: true},
  quantity: {type: Number, required: true, default: 0}
}, {timestamps: true})

export const mongooseProduct = 
mongoose.model<MongooseProduct>("Product", productSchema) 

