import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from 'shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private _auth: AuthService,
              private _router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this._auth.appUser$$.map(user => {
      if (user.isAdmin)
        return true;

      this._router.navigate([''], {skipLocationChange: true});
      return false;
    });
  }
}
