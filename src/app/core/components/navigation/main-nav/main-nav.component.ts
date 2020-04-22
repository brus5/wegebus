import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HammerInput, MatSidenav} from '@angular/material';
import {NAV_LINKS, TITLE} from '../menu';
import {DOCUMENT} from '@angular/common';
import {ShoppingCartService} from 'shared/services/shopping-cart.service';

import {NavService} from 'shared/services/nav.service';
import {AuthService} from 'shared/services/auth.service';
import {AppUser} from 'shared/models/app-user';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  public isHandset$: Observable<boolean>;
  cart$;

  @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;

  private appUser$: AppUser;

  constructor(@Inject(DOCUMENT) private document: Document,
              private _auth: AuthService,
              private _breakpointObserver: BreakpointObserver,
              private _navService: NavService,
              private _shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    let breakpoints = [Breakpoints.Handset];

    this.isHandset$ = this._breakpointObserver
      .observe(breakpoints)
      .pipe(map(result => result.matches));
    this._auth.appUser$$.subscribe(appUser => this.appUser$ = appUser);
    this._navService.isHandset$ = this.isHandset$;

    this.cart$ = (await this._shoppingCartService.getCart());
  }

  swipe($event: HammerInput) {
    if ($event.deltaX > 200)
      this.sidenav.open();
    else
      this.sidenav.close();
  }

  hideMenu() {
    this.sidenav.close();
  }

  get appTitle(): string {
    return TITLE;
  }

  get menuLinks() {
    return NAV_LINKS;
  }
}
