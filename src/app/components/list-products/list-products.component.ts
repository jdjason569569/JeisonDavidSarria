import { Component, OnDestroy, OnInit } from '@angular/core';
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

/**
 * This component manages the product management
 */

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit, OnDestroy {
  public page: number = 1;
  public products$: Observable<ProductInterface[]>;
  public productsFilter?: ProductInterface[];
  private searchTerm$ = new BehaviorSubject<string>('');
  public countResult?: number;
  public filteredProducts$?: Observable<ProductInterface[]>;
  public valuesPagination: number[] = [5, 10, 20];
  public selectedValue: number = this.valuesPagination[0];
  public showMenuIndex: boolean = false;
  public showModal = false;
  public nameProduct?: string;
  public idProduct!: number;
  private subscription: Subscription = new Subscription();

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getProducts();
  }

  ngOnInit() {
    this.filterProducts();
  }

  /**
   * Allows you to filter the products based on a search term.
   */
  public filterProducts() {
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

  /**
   * Triggers an event to search for the product and to add it to an observable
   * @param event word to search
   */
  public onInputChange(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    this.searchTerm$.next(searchValue);
  }

  /**
   * Allows to set a selectable for the items to be displayed
   * @param event
   */
  public onValueChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedValue = +selectElement.value;
  }

  public openModal(value: modalProduct) {
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
