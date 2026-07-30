import { APIRequestContext, APIResponse } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export class LoginAPI{
    request: APIRequestContext;
    constructor(request: APIRequestContext){
        this.request=request;
    }
    async loginUser(email:string,password:string): Promise<APIResponse>{
        return await this.request.post(`${process.env.WEBSITE_URL}api/verifyLogin`,{
            headers:{
                'Accept': 'application/json',
            },
            form:{
                email: email,
                password: password
            }
        })
    }  
}