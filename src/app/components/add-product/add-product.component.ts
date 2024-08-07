import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  public formCreateProduct: FormGroup = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}
  ngOnInit() {
    this.formCreateProduct = this.formBuilder.group({
      id: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
        [this.idValidator(this.productService)],
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

    this.formCreateProduct
      .get('date_release')
      ?.valueChanges.subscribe((date: string) => {
        if (date) {
          const releaseDate = new Date(date);
          releaseDate.setFullYear(releaseDate.getFullYear() + 1);
          const revisedDate = formatDate(releaseDate, 'yyyy-MM-dd', 'en-US');
          this.formCreateProduct.get('date_revision')?.setValue(revisedDate);
        }
      });
  }

  //pasar a una clase aparte
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

  //pasar a una clase aparte
  public idValidator(service: ProductService): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      if (!control.value) {
        return of(null);
      }
      return service.findProduct(control.value).pipe(
        map((exists) => (exists ? { idExists: true } : null)),
        catchError(() => of(null))
      );
    };
  }

  public onSubmit() {
    if (this.formCreateProduct?.valid) {
      this.productService
        .createProduct(this.formCreateProduct.value)
        .pipe(
          tap((response) => {
            if (response) {
              this.router.navigate(['/list-products']);
            }
          }),
          catchError((error) => {
            console.error('Error in createProduct:', error);
            return of([]);
          })
        )
        .subscribe();
    }
  }

  public clearForm() {
    this.formCreateProduct.reset();
  }
}
