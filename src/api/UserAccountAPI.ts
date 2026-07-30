import {APIRequestContext,APIResponse} from "@playwright/test";

export class UserAccountAPI{
    request:APIRequestContext;
    constructor(request:APIRequestContext){
        this.request=request;
    }
    async deleteUser(email:string,password:string): Promise<APIResponse>{
        return await this.request.delete(process.env.WEBSITE_URL+'api/deleteAccount',{
            headers:{
                'Accept': 'application/json',
            },
            form:{
                email:email,
                password:password
            }
        })
    }
    async updateUser(email:string,password:string,name:string,title:string,city:string,state:string,zipcode:string,mobileNumber:string,birth_date:string,birth_month:string,birth_year:string,first_name:string,last_name:string,company:string,address1:string,address2:string,country:string): Promise<APIResponse>{
        return await this.request.put(process.env.WEBSITE_URL+'api/updateAccount',{
            headers:{

            },
            form:{
                email:email,
                password:password,
                name:name,
                title:title,
                city:city,
                state:state,
                zipcode:zipcode,
                mobile_number:mobileNumber,
                birth_date:birth_date,
                birth_month:birth_month,
                birth_year:birth_year,
                firstname:first_name,
                lastname:last_name,
                company:company,
                address1:address1,
                address2:address2,
                country:country,
            }
        })
    }
    async getUserDetails(email:string): Promise<APIResponse>{
        return await this.request.get(process.env.WEBSITE_URL+'api/getUserDetailByEmail',{
            headers:{
                'Accept': 'application/json',
            },
            params:{
                email
            }
        })
    }
}