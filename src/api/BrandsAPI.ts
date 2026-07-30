import { APIRequestContext, APIResponse } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export class BrandsAPI {
  private request: APIRequestContext;
  constructor(request:APIRequestContext){
    this.request = request;
  }
  async getBrands(): Promise<APIResponse> {
    return await this.request.get(`${process.env.WEBSITE_URL}/api/brandsList`,{
        headers: {
            'Accept': 'application/json',
        }
    })
  }
}