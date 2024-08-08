import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { ApiResponse, ProductInterface } from '../models/product.interface';

/**
 * This class allows requests to be made to the backend regarding the products
 */
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private api = environment.apiUrl;

  public getProducts(): Observable<ProductInterface[]> {
    return this.http
      .get<ApiResponse>(`${this.api}/products`)
      .pipe(map((response) => response.data));
  }

  public createProduct(product: ProductInterface) {
    return this.http.post(`${this.api}/products`, product);
  }

  public updateProduct(product: ProductInterface) {
    return this.http.put(`${this.api}/products/${product.id}`, product);
  }

  public verifyProduct(idProduct: number) {
    return this.http.get<ProductInterface>(
      `${this.api}/products/verification/${idProduct}`
    );
  }

  public findProduct(idProduct: number) {
    return this.http.get<ProductInterface>(`${this.api}/products/${idProduct}`);
  }

  public deleteProduct(idProduct: number) {
    return this.http.delete(`${this.api}/products/${idProduct}`);
  }
}
