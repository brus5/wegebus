import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Product} from 'shared/models/product';
import {LinkService} from 'shared/services/link.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  @Input() productId: string;

  product = { name: '' } as Product;

  private productSubscription: Subscription = new Subscription();
  private initProductSubscription: Subscription = new Subscription();

  constructor(private _productService: ProductService,
              private _activatedRoute: ActivatedRoute,
              private _linkService: LinkService) {}

  ngOnInit() {
    this.productId = this._activatedRoute.snapshot.paramMap.get('id');
    if (this.productId)
      this.productSubscription = this._productService.getProduct(this.productId)
        .subscribe(prod =>
          this.initProductSubscription = this.initProduct(prod)
            .pipe(
              tap(() => null)
            ).subscribe());
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
    this.initProductSubscription.unsubscribe();
  }

  cuttedLink(link: string): string {
    return this._linkService.cutLink(link);
  }

  productName() {
    return this.product.name.charAt(0).toUpperCase() + this.product.name.slice(1);
  }

  private initProduct(prod: Product): Observable<any> {
    this.product = prod;
    return Observable.of(prod);
  }
}
