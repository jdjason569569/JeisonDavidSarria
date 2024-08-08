import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

export class CustomValidators {


  public static dataReleaseValidator(
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

  public static idValidator(service: ProductService): AsyncValidatorFn {
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
}
