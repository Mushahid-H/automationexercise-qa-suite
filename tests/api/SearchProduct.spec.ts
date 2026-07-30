import {test,expect} from '@playwright/test';
import { SearchAPI } from '../../src/api/SearchAPI.ts';
test.describe('Search Product Api', () => {
    test('Search with Search Params',async ({request})=>{
        const searchAPI = new SearchAPI(request);
        const response = await searchAPI.getSearchResults('T-shirt');
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(data.responseCode).toBe(200);
        expect(Array.isArray(data.products)).toBe(true);
        expect(data.products.length).toBeGreaterThan(0);
        for (const product of data.products) {
            expect(product).toHaveProperty('id');
            expect(product).toHaveProperty('name');
            expect(product).toHaveProperty('price');
            expect(product).toHaveProperty('brand');
            expect(product).toHaveProperty('category');
            expect(product.name.toLowerCase()).toContain('t-shirt');
        }

    });  
});