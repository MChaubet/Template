import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  public displaySignInSub = new BehaviorSubject(false);

  constructor() {}

  openSignIn(): void {
    this.displaySignInSub.next(true);
  }
  closeSignIn(): void {
    this.displaySignInSub.next(false);
  }
}
