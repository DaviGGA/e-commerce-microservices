import express from "express";
import proxy from "express-http-proxy";

const app = express();


app.use('/product', proxy("http://localhost:3001"))
app.use('/user', proxy("http://localhost:3000"))

app.listen(3005, () => "Proxy open on PORT 3005");