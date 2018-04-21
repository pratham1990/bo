import { Injectable } from '@angular/core';
import { Config } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

/*
  Generated class for the JsonApiClient provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class JsonApiCall {

  //Set our in class variables
  private data : any = null;    // our data holder in-class
  timeout: number = 15000;      // how long the request lasts before timeout

  constructor(public http: Http, public config : Config) {
    console.log('JsonApiClient First time initiated.');
    // this.loadCategories();
  }

  // Most used function in this class.
  // Usage Example (In your parent class):
    // this.jsonApi.load(Url, false)
  // where jsonApi is defined in your parent class constructor

  load(endpoint, cache : boolean = false) {
    //If caching is enabled:
    if (cache) {
      // Run http call with caching approach
      return this.loadWithCache(endpoint)
    }
    else {
      // run fresh call everytime
      return this.loadFresh(endpoint)
    }
  }

  // Simple http request. hits the endpoint everytime.
  // Useful for when you need to fetch search results, a pull-to-refresh,
  // or a fresh request.
  loadFresh(endpoint) {
    return Observable.forkJoin(
      this.http.get(endpoint).map(res => res.json())
      .timeout(this.timeout) //Timeout at 15 Seconds
    );
  }


  // load and preserve the results so It doesn't hit the end point everytime.
  // Since we're importing this per Component basis, every page
  // would have it's own this.data per every instance of JsonApiCall.
  // Useful when you need to cache results while navigating pages.
  loadWithCache(endpoint) {
    if (!this.data) {
      this.data = Observable.forkJoin(this.http.get(endpoint)
          .timeout(this.timeout)
          .map(res => res.json())
          .publishReplay(1)
          .refCount()
        )
      return this.data;
    }
    else {
      return this.data;
    }
  }

}
