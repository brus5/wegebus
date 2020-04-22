import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from 'shared/models/product';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {ShoppingCartService} from '../../services/shopping-cart.service';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.scss']
})
export class ProductsCatalogComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  isMobile: Observable<boolean>;

  private productsSubscription: Subscription;
  private cartSubscription: Subscription;

  constructor(private _route: ActivatedRoute,
              private _productService: ProductService,
              private _shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.cartSubscription = (await this._shoppingCartService.getCart())
      .subscribe(cart => this.cart = cart);

    this.productsSubscription = this._productService.getAll()
      .switchMap(products => {
        this.products = products;
        return this._route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('kategoria');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) : this.products;
      });
  }

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
    if (this.cartSubscription) this.cartSubscription.unsubscribe();
  }


}
