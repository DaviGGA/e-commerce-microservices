import { Request, Response } from "express"
import * as service from "../services/product-service"
import { errorToCode } from "../errors/api-error-to-code";
import { StatusCode } from "../errors/status-code";

export async function createProduct(req: Request,res: Response) {
  const [err, response] = await service.createProduct(req.body);

  if(err) {
    return res.status(errorToCode[err.name])
      .send({message: err.message, data: null})
  }

  res.status(StatusCode.CREATED)
    .send({message: null, data: response});
}

interface Bolsonaro {
  mitar(): void
}

class BolsonaroMito implements Bolsonaro {
  mitar(): void {
    throw new Error("Method not implemented.");
  }
  
}