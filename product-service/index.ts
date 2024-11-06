import 'dotenv/config'
import { mongooseconnect } from "./database/mongoose";
import express, { json } from "express";
import * as controller from './controllers/product-controller';
import { authenticate } from './middlewares/authenticate';

const app = express();

app.use(json());

app.use(authenticate);

app.post("/", controller.createProduct);
app.get("/:id", controller.findProduct);

mongooseconnect()

app.listen(3001, () => {
  console.log("PRODUCT SERVER OPEN ON PORT 3001")
})

