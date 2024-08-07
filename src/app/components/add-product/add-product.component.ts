import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  public formCreateProduct: FormGroup = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router: Router) {}
  ngOnInit() {
    this.formCreateProduct = this.formBuilder.group({
      id: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required], [this.dataReleaseValidator]],
      date_revision: ['', [Validators.required]],
    });



    this.formCreateProduct.get('date_release')?.valueChanges.subscribe((date: string) => {
      if (date) {
        const releaseDate = new Date(date);
        releaseDate.setFullYear(releaseDate.getFullYear() + 1);
        const revisedDate = formatDate(releaseDate, 'yyyy-MM-dd', 'en-US');
        this.formCreateProduct.get('date_revision')?.setValue(revisedDate);
      }
    });

  }

  public dataReleaseValidator(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return new Observable((observer) => {
      const currentDate = new Date();
      const inputDate = new Date(control.value);

      if (inputDate >= currentDate) {
        observer.next(null);
      } else {
        observer.next({ fechaInvalid: true });
      }
      observer.complete();
    });
  }

  public onSubmit() {
    if (this.formCreateProduct?.valid) {
      this.productService.createProduct(this.formCreateProduct.value).subscribe(value =>{
        if(value){
          this.router.navigate(['/list-products']);
        }
      });

    }
  }

  public clearForm() {
    this.formCreateProduct.reset();
  }
}
