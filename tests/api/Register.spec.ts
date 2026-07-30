import {test, expect} from '@playwright/test';
import {RegisterAPI} from '../../src/api/RegisterAPI.ts';


test.describe('Register Api', () => {
    test('Register with valid credentials', async ({request}) => {
        const registerAPI = new RegisterAPI(request);
        const response = await registerAPI.registerUser(
            'test@register.com',
            'test1234',
            'John Doe',
            'Mr.',
            'New York',
            'NY',
            '10001',
            '123-456-7890',
            '1',
            '1',
            '2000',
            'John',
            'Doe',
            'ABC Corp.',
            '123 Main St',
            'Apt 1',
            'USA'
        );
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(data.responseCode).toBe(201);
        expect(data.message).toBe('User created!');

    })
})