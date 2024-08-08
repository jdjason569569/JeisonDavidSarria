import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiResponse, ProductInterface } from '../models/product.interface';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3002/bp';
  const mockProducts: ProductInterface[] = [
    {
      id: '111',
      name: 'product 1',
      description: 'A high-performance smartphone with a 6.7-inch display.',
      logo: 'https://example.com/logo-smartphone-x.png',
      date_release: new Date('2024-01-15'),
      date_revision: new Date('2024-06-01'),
    },
    {
      id: '222',
      name: 'product 2',
      description: 'A lightweight and powerful laptop for professionals.',
      logo: 'https://example.com/logo-laptop-pro.png',
      date_release: new Date('2023-11-20'),
      date_revision: new Date('2024-03-10'),
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of products', () => {

    const mockResponse: ApiResponse = { data: mockProducts };

    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${apiUrl}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should post a new product', () => {
    const newProduct: ProductInterface = mockProducts[0];

    service.createProduct(newProduct).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}/products`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);
    req.flush(newProduct);
  });

  it('should update an existing product', () => {
    const updatedProduct: ProductInterface = mockProducts[0];

    service.updateProduct(updatedProduct).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}/products/${updatedProduct.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedProduct);
    req.flush(updatedProduct);
  });

  it('should return a product for verification', () => {
    const productId = 1;
    const mockProduct: ProductInterface = mockProducts[0];

    service.verifyProduct(productId).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(
      `${apiUrl}/products/verification/${productId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should return a product by id', () => {
    const productId = 1;
    const mockProduct: ProductInterface = mockProducts[0];

    service.findProduct(productId).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${apiUrl}/products/${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should delete a product', () => {
    const productId = 1;

    service.deleteProduct(productId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}/products/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
