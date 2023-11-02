import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  showAlert(title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' | 'question') {
    Swal.fire(title, message, type);
  }
}
