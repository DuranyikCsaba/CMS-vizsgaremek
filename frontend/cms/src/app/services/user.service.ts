import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUpdatedSource = new Subject<void>();
  userUpdated$ = this.userUpdatedSource.asObservable();

  notifyUserUpdate() {
    this.userUpdatedSource.next();
  }
}