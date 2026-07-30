import {test,expect} from '@playwright/test';
import {LoginAPI} from '../../src/api/LoginAPI.ts';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Login Api', () => {
    test('Login with valid credentials',async ({request})=>{
        const loginAPI = new LoginAPI(request);
        const response = await loginAPI.loginUser(process.env.LOGIN_EMAIL!,process.env.LOGIN_PASS!);
        expect(response.status()).toBe(200);
        const data=await response.json();
        expect(data.responseCode).toBe(200);
        expect(data.message).toBe('User exists!');
    })
})