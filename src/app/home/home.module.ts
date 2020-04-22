import {NgModule} from '@angular/core';

import {HomeComponent} from './components/home/home.component';
import {BannerMainComponent} from './components/banner-main/banner-main.component';

import {SharedModule} from 'shared/shared.module';
import {FooterModule} from '../footer/footer.module';
import {SlideshowModule} from 'ng-simple-slideshow';
import {AppRoutingModule} from '@app/app-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    BannerMainComponent,
  ],
  imports: [
    SharedModule,
    FooterModule,
    SlideshowModule,
    AppRoutingModule
  ],
  exports: []
})

export class HomeModule {}
