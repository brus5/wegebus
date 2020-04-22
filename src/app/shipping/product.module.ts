import {NgModule} from '@angular/core';

import {ProductComponent} from './components/product/product.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {ProductsCatalogComponent} from './components/products-catalog/products-catalog.component';
import {ProductFilterComponent} from './components/product-filter/product-filter.component';
import {ShoppingCartService} from 'shared/services/shopping-cart.service';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {CheckOutComponent} from './components/check-out/check-out.component';
import {ShippingFormComponent} from './components/shipping-form/shipping-form.component';
import {ShoppingCartSummaryComponent} from './components/shopping-cart-summary/shopping-cart-summary.component';
import {OrderSuccessComponent} from './components/order-success/order-success.component';
import {MyOrdersComponent} from './components/my-orders/my-orders.component';

import {SharedModule} from 'shared/shared.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FooterModule} from '../footer/footer.module';

import {ProductService} from './services/product.service';

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailsComponent,
    ProductsCatalogComponent,
    ProductFilterComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    ShippingFormComponent,
    ShoppingCartSummaryComponent,
    OrderSuccessComponent,
    MyOrdersComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FooterModule,
    RouterModule.forChild([
      {
        path: 'produkt/:title/:id',
        component: ProductDetailsComponent,
        data: { title: 'Produkt' }
      },
      {
        path: 'zamowienie-zlozone/:id',
        component: OrderSuccessComponent,
        data: { title: 'Zamówienie złożone' }
      },
    ])
  ],
  exports: [],
  providers: [
    ProductService,
    ShoppingCartService
  ]
})

export class ProductModule {}
