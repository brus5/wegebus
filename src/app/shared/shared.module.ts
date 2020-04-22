import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material.module';
import {ThirdPartyModule} from './third.party.module';

import {HttpClientModule} from '@angular/common/http';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdsenseModule} from 'ng2-adsense';
import {RouterModule} from '@angular/router';

import {ResponsiveComponent} from './components/responsive/responsive.component';
import {DropdownListComponent} from './components/dropdown-list/dropdown-list.component';
import {ProgressSpinnerComponent} from './components/progress-spinner/progress-spinner.component';

import {FilterProductPipe} from './pipes/filterProduct.pipe';

import {MinValueDirectiveDirective} from './directives/min-value-directive.directive';
import {MaxValueDirectiveDirective} from './directives/max-value-directive.directive';

import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {ImageUploadService} from './services/image-upload.service';
import {LinkService} from './services/link.service';
import {OrderService} from './services/order.service';

@NgModule({
  declarations: [
    ResponsiveComponent,
    DropdownListComponent,
    ProgressSpinnerComponent,

    FilterProductPipe,

    MinValueDirectiveDirective,
    MaxValueDirectiveDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ThirdPartyModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AdsenseModule.forRoot({adClient: 'ca-pub-2226661081282412'}),
  ],
  exports: [
    ResponsiveComponent,
    DropdownListComponent,
    ProgressSpinnerComponent,

    FilterProductPipe,

    MinValueDirectiveDirective,
    MaxValueDirectiveDirective,

    CommonModule,
    MaterialModule,
    ThirdPartyModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    AdsenseModule,
  ],
  providers: [
    UserService,
    AuthService,
    ImageUploadService,
    LinkService,
    OrderService
  ]
})

export class SharedModule {
}
