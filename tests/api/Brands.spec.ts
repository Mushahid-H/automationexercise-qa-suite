import {test, expect} from '@playwright/test';
import { BrandsAPI } from '../../src/api/BrandsAPI.ts';

test.describe('Brands List Api', () => {
    test('GET ALL BRANDS', async ({request}) => {
        const brandsAPI = new BrandsAPI(request);
        const response= await brandsAPI.getBrands();
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(200);
        expect(Array.isArray(responseBody.brands)).toBe(true);
        expect(responseBody.brands.length).toBeGreaterThan(0);
        expect(responseBody.brands[0]).toHaveProperty('id');
        expect(responseBody.brands[0]).toHaveProperty('brand');
    });
    test('PUT ALL BRANDS', async ({request}) => {
        const brandsAPI = new BrandsAPI(request);
        const response = await brandsAPI.putBrands();
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        // expect(responseBody.responseCode).toBe(405);
        expect(responseBody.message).toBe('This request method is not supported.');
    });
})