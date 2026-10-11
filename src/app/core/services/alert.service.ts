import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor() { }

  private Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  showError(title: string, message: string = '') {
    this.Toast.fire({
      width: '470px',
      timer: 5000,
      icon: 'error',
      title: title,
      text: message
    });
  }

  showSuccess(title: string, message: string = '') {
    this.Toast.fire({
      width: '380px',
      timer: 5000,
      icon: 'success',
      title: title,
      text: message
    });
  }
}