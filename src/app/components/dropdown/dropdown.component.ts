import { Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/models/product.interface';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent{
  isOpen = false;
  @Input() product?: ProductInterface;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

}
