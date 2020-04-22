import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../../shared/services/category.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit, OnDestroy {

  categories = [];
  @Input('category') category;

  private categoriesSubscription: Subscription;

  constructor(private _categoryService: CategoryService) { }

  ngOnInit() {
    this.categoriesSubscription = this._categoryService.getAll()
      .subscribe(categories => this.categories = categories);
  }


  ngOnDestroy() {
    this.categoriesSubscription.unsubscribe();
  }


}
