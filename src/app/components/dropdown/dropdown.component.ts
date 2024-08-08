import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  modalProduct,
  ProductInterface,
} from 'src/app/models/product.interface';

/**
 * This component manages the editing and deleting of a product
 */
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent {
  isOpen = false;
  @Input() product!: ProductInterface;
  @Output() isOpenModal: EventEmitter<modalProduct> =
    new EventEmitter<modalProduct>();
  openModal = false;

  public toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  public openModalMethod() {
    this.isOpenModal.emit({
      isOpen: true,
      nameProduct: this.product?.name,
      idProduct: +this.product.id,
    });
    this.toggleDropdown();
  }
}
