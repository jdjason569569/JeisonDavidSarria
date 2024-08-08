import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';
import { ProductInterface } from 'src/app/models/product.interface';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownComponent],
    });
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isOpen property when toggleDropdown is called', () => {
    expect(component.isOpen).toBeFalsy();
    component.toggleDropdown();
    expect(component.isOpen).toBeTruthy();
  });

  it('should emit an event with correct data when openModalMethod is called', () => {
    const product: ProductInterface = {
      id: '111',
      name: 'product 1',
      description: 'A high-performance smartphone with a 6.7-inch display.',
      logo: 'https://example.com/logo-smartphone-x.png',
      date_release: new Date('2024-01-15'),
      date_revision: new Date('2024-06-01'),
    };
    component.product = product;
    jest.spyOn(component.isOpenModal, 'emit');

    component.openModalMethod();

    expect(component.isOpenModal.emit).toHaveBeenCalledWith({
      isOpen: true,
      nameProduct: product.name,
      idProduct: +product.id,
    });
    expect(component.isOpen).toBeTruthy();
  });
});
