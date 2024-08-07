import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { ApiResponse, ProductInterface } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

   private api = environment.apiUrl;

  public getProducts(): Observable<ProductInterface[]>{
    return of([
      {
        id: "prod001",
        name: "Smartphone X",
        description: "A high-performance smartphone with a 6.7-inch display.",
        logo: "https://example.com/logo-smartphone-x.png",
        date_release: new Date('2024-01-15'),
        date_revision: new Date('2024-06-01')
      },
      {
        id: "prod002",
        name: "Laptop Pro",
        description: "A lightweight and powerful laptop for professionals.",
        logo: "https://example.com/logo-laptop-pro.png",
        date_release: new Date('2023-11-20'),
        date_revision: new Date('2024-03-10')
      },
      {
        id: "prod003",
        name: "Smartwatch Ultra",
        description: "A smartwatch with advanced health tracking features.",
        logo: "https://example.com/logo-smartwatch-ultra.png",
        date_release: new Date('2024-05-01'),
        date_revision: new Date('2024-07-15')
      }
    ])
    // return this.http.get<ApiResponse>(`${this.api}/products`).pipe(map(response => response.data));
  }
}
