import {NgModule} from '@angular/core';

import {SharedModule} from 'shared/shared.module';
import {FooterComponent} from './components/footer/footer.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    FooterComponent
  ]
})

export class FooterModule {}
