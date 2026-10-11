import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ApiErrorResponse } from '../model/api-model';
import { AlertService } from '../services/alert.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const alertService = inject(AlertService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const body = error.error as ApiErrorResponse | null;

      if (error.status === 0) {
        alertService.showError(
          'Connection Error',
          'Unable to connect to the server.'
        );

        return throwError(() => error);
      }

      const validationMessages = Object.entries(
        body?.errors ?? {}
      ).flatMap(([field, messages]) =>
        messages.map(message => `${field}: ${message}`)
      );

      if (error.status === 400 && validationMessages.length > 0) {
        alertService.showError(
          body?.message ?? 'Invalid input data',
          validationMessages.join('\n')
        );

        return throwError(() => error);
      }

      alertService.showError(
        body?.message ?? 'An error occurred',
        `HTTP ${error.status}`
      );

      return throwError(() => error);
    })
  );
};