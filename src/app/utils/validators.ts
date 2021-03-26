import { AbstractControl } from '@angular/forms';
import { CategoriesService } from '@core/services/categories/categories.service';
import { timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export class MyValidators {

  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    if (value > 10000) {
      return {price_invalid: true};
    }
    return null;
  }

  static validatePassword(control: AbstractControl){
    const value: string = control.value;
    if (!containsNumber(value)) {
      return {invalid_password: true};
    }
    return null;
  }

  
  static matchPassword(control: AbstractControl){
    const password: string = control.get("password").value;
    const confirmPassword: string = control.get("confirmPassword").value;
    if (password !== confirmPassword) {
      return {match_password: true};
    }
    return null;
  }

  static validateCategory(service: CategoriesService){
    return (control: AbstractControl) => {
      const value = control.value;
      return timer(500).pipe(
        switchMap(() => {
          return service.checkCategory(value)
          .pipe(
            map((response: Record<string,boolean>) => {
              const {isAvailable} = response; 
              return !isAvailable ? {notAvailable:true}:null
            })
          )
        })
      )}
  }
}

function containsNumber(value: string): boolean {
  return value.split('').some(isNumber);
}

function isNumber(value: string): boolean {
  return !isNaN(parseInt(value,10))
}