import 'dotenv/config'
import { mongooseconnect } from "./database/mongoose";
import express, { json } from "express";
import * as controller from './controllers/user-controller';

const app = express();

app.use(json());

app.post("/", controller.createUser);
app.post("/login", controller.login);

mongooseconnect()

app.listen(3000, () => {
  console.log("USER SERVER OPEN")
})