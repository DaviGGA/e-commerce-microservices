import { Request, Response } from "express"
import * as service from "../services/product-service"

export async function createProduct(req: Request,res: Response) {
  const response = await service.createProduct(req.body);
  res.status(201).send(response);
}