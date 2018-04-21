import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Config } from 'ionic-angular';
import { JsonApiCall } from '../../providers/json-api-call/json-api-call';
import { PostDetailPage } from '../post-detail/post-detail';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  didNotLoad: boolean = false;
  searchReturnedResults : boolean = false;
  searchTerm: string = 'search here';
  relatedPostsData : any;
  searchResultsData : any;
  pageNumber : number = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController : LoadingController,
    public jsonApiCall : JsonApiCall,
    public config: Config
  ) {
    this.searchResultsData = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  // Function to load more posts using ion-infinite-scoll.
  doInfinite(infiniteScroll) {
    this.pageNumber = this.pageNumber + 1;

    this.jsonApiCall.load(this.config.get("apiUrl")+"/posts?filter[s]="+this.searchTerm+"&page="+this.pageNumber).subscribe(
      data => {
        // Successful Request
        for(let post of data[0]){
          this.searchResultsData.push(post);
        }

        if(data[0].length < 1) {
          // No more data was returned.
          // reduce our pageNumber back by 1, so next time we scroll down,
          // we don't skip a number
          this.pageNumber = this.pageNumber - 1;
        }
        // this.didNotLoad = false
        console.log(this.searchResultsData);
        // this.searchReturnedResults = true;  //Flag to show/hide the search results section
        // loader.dismiss();
        infiniteScroll.complete();
      },
      err => {
        // Failed Request
        // this.didNotLoad = true;
        // loader.dismiss();
        console.log(err);
        infiniteScroll.complete();

        // reduce our pageNumber back by 1, so next time we scroll down,
        // we don't skip a number
        this.pageNumber = this.pageNumber - 1;
      }
    )
  }


  // Fired on hitting enter in the searchbox.
  loadSearchResults() {
    //A Local variable for configuring our loadingController
    let loader = this.loadingController.create({
      content: `<div class='app-spinner'></div>`
    });

    // For Debugging
    console.log("You searched for: ",this.searchTerm);

    // Show loader on screen
    loader.present();

    // Load the data using our http Service. Remember the cache parameter is either true/false.
    // If not specified, the service assumes false. Which is okay, we don't want to cache search results
    this.jsonApiCall.load(this.config.get("apiUrl")+"/posts?filter[s]="+this.searchTerm).subscribe(
      data => {
        // Successful Request
        for(let post of data[0]){
          this.searchResultsData.push(post);
        }
        this.didNotLoad = false
        console.log(this.searchResultsData);
        this.searchReturnedResults = true;  //Flag to show/hide the search results section
        loader.dismiss();
      },
      err => {
        // Failed Request
        this.didNotLoad = true;
        loader.dismiss();
        console.log(err);
      }
    )
  }

  // Method navigation to PostDetailPage with Post ID
  gotoDetailPost($event) {
    console.log($event);
    this.navCtrl.push(PostDetailPage, {
      id: $event.miniPostID
    })
  }

}
