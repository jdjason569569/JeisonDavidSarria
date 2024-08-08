import { Component, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import {
  modalProduct,
  ProductInterface,
} from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnDestroy{
  page: number = 1;
  public products$: Observable<ProductInterface[]>;
  public productsFilter?: ProductInterface[];
  private searchTerm$ = new BehaviorSubject<string>('');
  public countResult?: number;
  public filteredProducts$?: Observable<ProductInterface[]>;
  valuesPagination: number[] = [5, 10, 20];
  selectedValue: number = this.valuesPagination[0];
  showMenuIndex: boolean = false;
  showModal = false;
  nameProduct?: string;
  idProduct!: number;
  private subscription: Subscription = new Subscription();

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

  public onValueChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedValue = +selectElement.value;
  }

  openModal(value: modalProduct) {
    this.showModal = value.isOpen;
    this.nameProduct = value.nameProduct;
    this.idProduct = value.idProduct;
  }

  public deleteProduct() {
    this.subscription.add(
      this.productService
        .deleteProduct(this.idProduct)
        .pipe(
          map((value) => {
            if (value) {
              this.closeModal();
              this.products$ = this.productService.getProducts();
            }
          })
        )
        .subscribe()
    );
  }

  closeModal() {
    this.showModal = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
