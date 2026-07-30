import {test,expect} from '@playwright/test';
import { ProductListApi } from '../../src/api/ProductListApi.ts';
test.describe('Product List Api', () => {

    test('Product List Api',async ({request})=>{
        const productListApi = new ProductListApi(request);
        const response = await productListApi.getProductList();
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(data.responseCode).toBe(200);
        expect(Array.isArray(data.products)).toBe(true);
        expect(data.products.length).toBeGreaterThan(0);
        const firstProduct=data.products[0];
        expect(firstProduct).toHaveProperty('id')
        expect(firstProduct).toHaveProperty('name')
        expect(firstProduct).toHaveProperty('price')
        expect(firstProduct).toHaveProperty('brand')
        expect(firstProduct).toHaveProperty('category')


    });
    test('Product List Api Post',async ({request})=>{
        const productListApi = new ProductListApi(request);
        const response = await productListApi.postProductList();
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(data.responseCode).toBe(405);
        expect(data.message).toBe('This request method is not supported.');    
    });

});

