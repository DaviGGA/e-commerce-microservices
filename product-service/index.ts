import 'dotenv/config'
import { mongooseconnect } from "./database/mongoose";
import express, { json } from "express";
import * as controller from './controllers/product-controller';

const app = express();

app.use(json());

app.post("/product", controller.createProduct);

mongooseconnect()

app.listen(3005, () => {
  console.log("Server open on port 3005")
})

