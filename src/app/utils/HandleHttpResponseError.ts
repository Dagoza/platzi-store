import { HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

export function HandleHttpResponseError(
  err: HttpErrorResponse
): Observable<never> {
  return throwError(`message: ${err.message}`);
};