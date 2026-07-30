import {test,expect} from '@playwright/test';
import {UserAccountAPI} from '../../src/api/UserAccountAPI.ts';
import dotenv from 'dotenv';
dotenv.config();

test.describe('User Account APIs', () => {
    test('Delete User account',async ({request}) => {
        const deleteUserAPI = new UserAccountAPI(request);
        const response = await deleteUserAPI.deleteUser('test@register.com','test1234');
        expect(response.status()).toBe(200);
        const data=await response.json();
        expect(data.responseCode).toBe(200);
        expect(data.message).toBe('User deleted!');
    });
    test('Update User account',async ({request}) => {
        const updateUserAPI = new UserAccountAPI(request);
        const response = await updateUserAPI.updateUser(process.env.LOGIN_EMAIL!,process.env.LOGIN_PASS!,'John Doe','Mr.','New York','NY','10001','123-456-7890','1','1','2000','John','Doe','ABC Corp.','123 Main St','Apt 1','England');
        expect(response.status()).toBe(200);
        const data=await response.json();
        expect(data.responseCode).toBe(200);
        expect(data.message).toBe('User updated!');

    });
})