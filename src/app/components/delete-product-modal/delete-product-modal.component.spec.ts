import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductModalComponent } from './delete-product-modal.component';

describe('DeleteProductModalComponent', () => {
  let component: DeleteProductModalComponent;
  let fixture: ComponentFixture<DeleteProductModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteProductModalComponent]
    });
    fixture = TestBed.createComponent(DeleteProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirmDelete event when onConfirmDelete is called', () => {
    jest.spyOn(component.confirmDelete, 'emit');
    component.onConfirmDelete();
    expect(component.confirmDelete.emit).toHaveBeenCalled();
  });

  it('should emit cancel event when onCancel is called', () => {
    jest.spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(component.cancel.emit).toHaveBeenCalled();
  });
});
