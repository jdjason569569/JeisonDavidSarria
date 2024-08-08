import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductsComponent } from './list-products.component';
import { ProductInterface } from 'src/app/models/product.interface';
import { of } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { DeleteProductModalComponent } from '../delete-product-modal/delete-product-modal.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('ListProductsComponent', () => {
  let component: ListProductsComponent;
  let fixture: ComponentFixture<ListProductsComponent>;
  let productServiceMock: any;

  const mockProducts: ProductInterface[] = [
    {
      id: '111',
      name: 'product 1',
      description: 'A high-performance smartphone with a 6.7-inch display.',
      logo: 'https://example.com/logo-smartphone-x.png',
      date_release: new Date('2024-01-15'),
      date_revision: new Date('2024-06-01'),
    },
    {
      id: '222',
      name: 'product 2',
      description: 'A lightweight and powerful laptop for professionals.',
      logo: 'https://example.com/logo-laptop-pro.png',
      date_release: new Date('2023-11-20'),
      date_revision: new Date('2024-03-10'),
    },
  ];

  beforeEach(() => {
    productServiceMock = {
      getProducts: jest.fn().mockReturnValue(of(mockProducts)),
      deleteProduct: jest.fn().mockReturnValue(of(true)),
    };
    TestBed.configureTestingModule({
      declarations: [
        ListProductsComponent,
        DropdownComponent,
        DeleteProductModalComponent,
      ],
      imports: [NgxPaginationModule, FormsModule, RouterModule.forRoot([])],
      providers: [{ provide: ProductService, useValue: productServiceMock }],
    });
    fixture = TestBed.createComponent(ListProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter products based on search term', () => {
    component.onInputChange({ target: { value: 'product 1' } } as any);
    fixture.detectChanges();

    component.filteredProducts$?.subscribe((filteredProducts) => {
      expect(filteredProducts.length).toBe(1);
      expect(filteredProducts[0].name).toBe('product 1');
      expect(component.countResult).toBe(1);
    });
  });

  it('should set modal properties correctly when openModal is called', () => {
    const modalData = {
      isOpen: true,
      nameProduct: 'Smartphone X',
      idProduct: 1,
    };
    component.openModal(modalData);
    expect(component.showModal).toBe(modalData.isOpen);
    expect(component.nameProduct).toBe(modalData.nameProduct);
    expect(component.idProduct).toBe(modalData.idProduct);
  });

  it('should update selectedValue when onValueChange is called', () => {
    const newValue = 10;
    const event = {
      target: {
        value: newValue.toString()
      }
    } as unknown as Event;
    component.onValueChange(event);
    expect(component.selectedValue).toBe(newValue);
  });

  it('should set showModal to false when closeModal is called', () => {

    component.showModal = true;
    component.closeModal();
    expect(component.showModal).toBe(false);
  });

  it('should call deleteProduct on ProductService, close modal and update products list when deleteProduct is called', () => {

    const mockProduct: ProductInterface[] = [
      {
        id: '222',
        name: 'product 2',
        description: 'A lightweight and powerful laptop for professionals.',
        logo: 'https://example.com/logo-laptop-pro.png',
        date_release: new Date('2023-11-20'),
        date_revision: new Date('2024-03-10'),
      },
    ];
    component.idProduct = 111;
    component.showModal = true;
    component.deleteProduct();
    expect(productServiceMock.deleteProduct).toHaveBeenCalledWith(component.idProduct);
    expect(productServiceMock.getProducts).toHaveBeenCalled();
    productServiceMock.getProducts.mockReturnValue(of(mockProduct));
    fixture.detectChanges();
    expect(component.products$).toBeDefined();
  });
});
