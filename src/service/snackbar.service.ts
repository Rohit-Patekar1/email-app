import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private snackbarSubject = new BehaviorSubject<SnackbarState>({ message: '', type: 'success', show: false });

  snackbarState = this.snackbarSubject.asObservable();

  constructor() {}

  showSnackbar(message: string, type: 'success' | 'error'): void {
    this.snackbarSubject.next({ message, type, show: true });

    setTimeout(() => {
      this.snackbarSubject.next({ message: '', type: 'success', show: false });
    }, 4000);
  }
}

interface SnackbarState {
  message: string;
  type: 'success' | 'error';
  show: boolean;
}
