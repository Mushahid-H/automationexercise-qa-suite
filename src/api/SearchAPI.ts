import { APIRequestContext, APIResponse } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export class SearchAPI{
    request: APIRequestContext;
    constructor(request: APIRequestContext){
        this.request = request;
    }
    async getSearchResults(searchTerm:string): Promise<APIResponse>{
        return await this.request.post(`${process.env.WEBSITE_URL}api/searchProduct`,{
            headers:{
                'Accept': 'application/json',
            },
            form:{
                search_product: searchTerm
            }
        })
    }
    async searchWithoutParams(): Promise<APIResponse> {
        return await this.request.post(`${process.env.WEBSITE_URL}api/searchProduct`,{
            headers:{
                'Accept': 'application/json',
            }
            
        })
    }

}