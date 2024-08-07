import { Component } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { ProductInterface } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent {
  page: number = 1;
  public products$: Observable<ProductInterface[]>;
  public productsFilter?: ProductInterface[];
  private searchTerm$ = new BehaviorSubject<string>('');
  public countResult?: number;
  filteredProducts$?: Observable<ProductInterface[]>;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getProducts();
    this.filteredProducts$ = this.searchTerm$.pipe(
      switchMap((value) => {
        return this.products$.pipe(
          map((products) =>
            products.filter((product) => {
              return product.name.toLowerCase().includes(value.toLowerCase());
            })
          ),
          tap((value) => {
            this.countResult = value.length;
          })
        );
      })
    );
  }

  public onInputChange(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    this.searchTerm$.next(searchValue);
  }
}
