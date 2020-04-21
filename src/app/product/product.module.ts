import {NgModule} from '@angular/core';

import {ProductsComponent} from './components/products/products.component';
import {ProductFormComponent} from './components/product-form/product-form.component';
import {ProductComponent} from './components/product/product.component';
import {ProductNutritionComponent} from './components/product-nutrition/product-nutrition.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {ProductsCatalogComponent} from './components/products-catalog/products-catalog.component';
import {ProductFilterComponent} from './components/product-filter/product-filter.component';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {ShoppingCartService} from './services/shopping-cart.service';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {ProductQuantityComponent} from './components/product-quantity/product-quantity.component';

import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FooterModule} from '../footer/footer.module';

import {ProductService} from './services/product.service';
import {AuthGuardService} from '../shared/services/auth-guard.service';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductFormComponent,
    ProductComponent,
    ProductNutritionComponent,
    ProductDetailsComponent,
    ProductsCatalogComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ShoppingCartComponent,
    ProductQuantityComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FooterModule,
    RouterModule.forChild([
      {
        path: 'produkty/nowy',
        component: ProductFormComponent,
        canActivate: [AuthGuardService],
        data: { title: 'Nowy produkt' }
      },
      {
        path: 'produkty/edycja/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuardService],
        data: { title: 'Edytuj produkt' }
      },
      {
        path: 'produkt/:title/:id',
        component: ProductDetailsComponent,
        data: { title: 'Produkt' }
      }
    ])
  ],
  exports: [],
  providers: [
    ProductService,
    ShoppingCartService
  ]
})

export class ProductModule {}
