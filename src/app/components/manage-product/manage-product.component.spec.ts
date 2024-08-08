import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageProductComponent } from './manage-product.component';
import { ProductService } from 'src/app/services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';


describe('ManageProductComponent', () => {
  let component: ManageProductComponent;
  let fixture: ComponentFixture<ManageProductComponent>;
  let productServiceMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageProductComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
      ],
    });
    fixture = TestBed.createComponent(ManageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate revised date correctly on date release change', () => {
    component.formCreateProduct.get('date_release')?.setValue('2024-01-01');

    const revisedDate = component.formCreateProduct.get('date_revision')?.value;
    expect(revisedDate).toBe('2024-12-31');
  });

  it('should unsubscribe from subscriptions on destroy', () => {
    const unsubscribeMock = jest.fn();
    (component as any).subscription = { unsubscribe: unsubscribeMock };

    component.ngOnDestroy();
    expect(unsubscribeMock).toHaveBeenCalled();
  });


});
