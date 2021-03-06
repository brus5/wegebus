import {FormsModule} from '@angular/forms';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {MaterialModule} from './shared/material.module';
import {ThirdPartyModule} from './shared/third.party.module';
import {HomeModule} from './home/home.module';
import {ProductModule} from './shipping/product.module';
import {AdminModule} from './admin/admin.module';
import {FooterModule} from './footer/footer.module';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFirestoreModule} from '@angular/fire/firestore';

import {AngularFireModule} from '@angular/fire';
import {PaginationModule} from 'ngx-bootstrap/pagination';

import {environment} from '../environments/environment';
import {registerLocaleData} from '@angular/common';
import localePl from '@angular/common/locales/pl';
import {ErrorModule} from './error/error.module';

registerLocaleData(localePl);

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    CoreModule,
    SharedModule,
    MaterialModule,
    ThirdPartyModule,
    HomeModule,
    ProductModule,
    AdminModule,
    FooterModule,
    ErrorModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,

    AngularFireModule.initializeApp(environment.firebase),

    PaginationModule.forRoot()
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pl'}],
  bootstrap: [AppComponent]
})

export class AppModule {}
