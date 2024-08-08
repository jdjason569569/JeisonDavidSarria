import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageProductComponent } from './manage-product.component';



describe('AddProductComponent', () => {
  let component: ManageProductComponent;
  let fixture: ComponentFixture<ManageProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageProductComponent]
    });
    fixture = TestBed.createComponent(ManageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
