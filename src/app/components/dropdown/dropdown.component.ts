import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  modalProduct,
  ProductInterface,
} from 'src/app/models/product.interface';

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

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  openModalMethod() {
    this.isOpenModal.emit({
      isOpen: true,
      nameProduct: this.product?.name,
      idProduct: +this.product.id,
    });
    this.toggleDropdown();
  }
}
