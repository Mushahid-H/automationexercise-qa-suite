import {APIRequestContext, APIResponse} from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export class ProductListApi {
    private request: APIRequestContext;
    constructor(request:APIRequestContext){
        this.request = request;
    }
    async getProductList(): Promise<APIResponse> {
    return await this.request.get(`${process.env.WEBSITE_URL}/api/productsList`, {
        headers: {
            'Accept': 'application/json',
        },
    });
}
}