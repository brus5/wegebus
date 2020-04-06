import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from '../../services/news.service';
import {Observable, Subscription} from 'rxjs';
import {News} from '../../../shared/models/news';
import {AppUser} from '../../../shared/models/app-user';
import {AuthService} from '../../../shared/services/auth.service';
import {LinkService} from '../../../shared/services/link.service';

@Component({
  selector: 'news-read-more',
  templateUrl: './news-read-more.component.html',
  styleUrls: ['./news-read-more.component.scss']
})
export class NewsReadMoreComponent implements OnInit, OnDestroy {

  @Input('newsId') newsId: string;

  news = {} as News;
  appUser$ = {} as AppUser;

  private newsSubscription: Subscription = new Subscription();
  private initNewsSubscription: Subscription = new Subscription();
  private userSubscription: Subscription = new Subscription();
  newsLoading = true;

  constructor(private _authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private _newsService: NewsService,
              private _linkService: LinkService) { }

  ngOnInit() {
    this.userSubscription = this._authService.appUser$$
      .subscribe(user => user ? this.appUser$ = user : this.appUser$);
    this.newsId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.newsId) {
      this.newsSubscription = this._newsService.getNews(this.newsId)
        .subscribe(item =>
           this.initNewsSubscription = this.initNews(item)
             .subscribe(_ => null)
        );
    }
  }

  ngOnDestroy() {
    this.newsSubscription.unsubscribe();
    this.initNewsSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.newsLoading = true;
  }

  get written(): any {
    return this.news.date;
  }

  get admin() {
    return this.appUser$.isAdmin;
  }

  private initNews(item: News): Observable<any> {
    this.news = item;
    this.newsLoading = false;
    return Observable.of(item);
  }
}
