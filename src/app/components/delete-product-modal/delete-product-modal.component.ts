import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * This component presents a mode to eliminate a product
 */

@Component({
  selector: 'app-delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.css'],
})
export class DeleteProductModalComponent {
  @Input() product?: string;
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirmDelete() {
    this.confirmDelete.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
