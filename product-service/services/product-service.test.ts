import {assert, describe, expect, it} from "vitest";
import sinon from "sinon";
import * as productRepository from "../repositories/product-repository"
import * as productService from "./product-service"
import { MongooseProduct, mongooseProduct } from "../models/mongoose-product";
import { APIErrors } from "../errors/api-errors";

describe("Product service tests", () => {
  
  it("createProduct successfully", async () => {
    // pass
  }) 

})