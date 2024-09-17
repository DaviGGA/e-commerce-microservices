import {assert, describe, expect, it} from "vitest";
import sinon from "sinon";
import * as productRepository from "../repositories/product-repository"
import * as productService from "./product-service"
import { MongooseProduct, mongooseProduct } from "../models/mongoose-product";
import { APIErrors } from "../errors/api-errors";

describe("Product service tests", () => {
  
  it("createProduct successfully", async () => {
    const input = {
      name: "Test Product",
      price: 5.20
    }

    const mongooseCreateStub = sinon
      .stub(mongooseProduct, "create")
      .resolves({
        _id: "2321873",
        name: "Test Product",
        quantity: 0,
        price: 5.20
      } as any)
    
    const [_, createdProduct] = await productService.createProduct(input);
    
    expect(createdProduct?.id).toBeDefined();
    expect(createdProduct?.name).toBe(input.name);
    expect(createdProduct?.price).toBe(input.price);

    mongooseCreateStub.restore();
  })

  it("createProduct should fail if price smaller than 0", async () => {
    const input = {
      name: "Test Product",
      price: -5.20
    }

    const mongooseCreateStub = sinon
      .stub(mongooseProduct, "create")
      .resolves()
    
    const [createError, createdProduct] = await productService.createProduct(input);
    
    expect(createError?.message).toBeDefined();
    expect(createError?.name).toBe(APIErrors.ZodParseError);

    mongooseCreateStub.restore();  
  }) 

})