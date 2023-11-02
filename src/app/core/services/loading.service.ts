import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading$ = new Subject<boolean>();
  petitionsCounter = 0;

  show() {
    this.petitionsCounter++;
    this.isLoading$.next(true);
  }

  hide() {
    this.petitionsCounter--;
    if (this.petitionsCounter === 0) this.isLoading$.next(false);
  }
}
