import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  constructor(private productService: ProductService) {
    //this.products$ = this.productService.getProducts();
    this.products$ = of([
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
  }
}
