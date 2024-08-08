import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  catchError,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { ProductInterface } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'manage-add-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css'],
})
export class ManageProductComponent implements OnInit, OnDestroy {
  public formCreateProduct: FormGroup = this.formBuilder.group({});
  public formEditProduct: FormGroup = this.formBuilder.group({});
  product?: ProductInterface;
  private subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createProductForm();
  }
  ngOnInit() {
    this.subscription.add(
      this.route.paramMap
        .pipe(
          switchMap((params) => {
            const idProduct = params.get('id');
            return idProduct
              ? this.productService.findProduct(+idProduct)
              : of(null);
          }),
          tap((product) => {
            if (product) {
              this.product = product;
              this.editProductForm(product);
            }
          })
        )
        .subscribe()
    );

    this.subscription.add(
      this.formCreateProduct
        .get('date_release')
        ?.valueChanges.subscribe((date: string) => {
          if (date) {
            const releaseDate = new Date(date);
            releaseDate.setFullYear(releaseDate.getFullYear() + 1);
            const revisedDate = formatDate(releaseDate, 'yyyy-MM-dd', 'en-US');
            this.formCreateProduct.get('date_revision')?.setValue(revisedDate);
          }
        })
    );
  }

  public createProductForm() {
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
          Validators.minLength(6),
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
  }

  public editProductForm(product: ProductInterface) {
    this.formEditProduct = this.formBuilder.group({
      id: [
        product?.id,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      name: [
        product?.name,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),
        ],
      ],
      description: [
        product?.description,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: [product?.logo, Validators.required],
      date_release: [
        product?.date_release,
        [Validators.required],
        [this.dataReleaseValidator],
      ],
      date_revision: [product?.date_revision, [Validators.required]],
    });
    this.subscription.add(
      this.formEditProduct
        .get('date_release')
        ?.valueChanges.subscribe((date: string) => {
          if (date) {
            const releaseDate = new Date(date);
            releaseDate.setFullYear(releaseDate.getFullYear() + 1);
            const revisedDate = formatDate(releaseDate, 'yyyy-MM-dd', 'en-US');
            this.formEditProduct.get('date_revision')?.setValue(revisedDate);
          }
        })
    );
  }

  public getIdValidators(product: any) {
    const baseValidators = [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]*$'),
    ];

    if (!product) {
      return [baseValidators, this.idValidator(this.productService)];
    }

    return baseValidators;
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
      return service.verifyProduct(control.value).pipe(
        map((exists) => (exists ? { idExists: true } : null)),
        catchError(() => of(null))
      );
    };
  }

  public onSubmit() {
    if (this.product) {
      if (this.formEditProduct?.valid) {
        this.subscription.add(
          this.productService
            .updateProduct(this.formEditProduct.value)
            .pipe(
              tap((response) => {
                if (response) {
                  this.router.navigate(['/list-products']);
                }
              }),
              catchError((error) => {
                console.error('Error in updateProduct:', error);
                return of([]);
              })
            )
            .subscribe()
        );
      }
    } else {
      if (this.formCreateProduct?.valid) {
        this.subscription.add(
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
            .subscribe()
        );
      }
    }
  }

  public clearForm() {
    this.formCreateProduct.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
