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
    console.log("getProducts");
     return this.http.get<ApiResponse>(`${this.api}/products`).pipe(map(response => response.data));
  }

  public createProduct(product: ProductInterface) {
    console.log("createProduct");
    return this.http.post(`${this.api}/products`, product);
  }

  public updateProduct(product: ProductInterface) {
    console.log("updateProduct");
    return this.http.put(`${this.api}/products/${product.id}`, product);
  }

  public verifyProduct(idProduct: number) {
    console.log("verifyProduct");
    return this.http.get<ProductInterface>(`${this.api}/products/verification/${idProduct}`);
  }

  public findProduct(idProduct: number) {
    console.log("findProduct");
    return this.http.get<ProductInterface>(`${this.api}/products/${idProduct}`);
  }

  public deleteProduct(idProduct: number) {
    console.log("delete");
    return this.http.delete(`${this.api}/products/${idProduct}`);
  }
}
