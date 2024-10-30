import 'dotenv/config'
import { mongooseconnect } from "./database/mongoose";
import express, { json } from "express";
import * as controller from './controllers/product-controller';

const app = express();

app.use(json());

app.post("/product", controller.createProduct);
app.get("/product/:id", controller.findProduct);

mongooseconnect()

app.listen(3000, () => {
  console.log("PRODUCT SERVER OPEN ON PORT 3001")
})

