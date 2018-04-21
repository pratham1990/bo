import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Config } from 'ionic-angular';
import { JsonApiCall } from '../../providers/json-api-call/json-api-call';
import { PostDetailPage } from '../post-detail/post-detail';

/*
  Generated class for the Category page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {
  numberOfPostsInLoaded: any;
  CategorySlug : number;
  CategoryName : string;
  categoryPostData : any;
  numberOfPostsInCategory : any;
  didNotLoad: boolean = false;
  pageNumber : number = 1;
  dataAfter : number = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public config: Config,
    public jsonApiCall : JsonApiCall
  ) {
    // We're getting our CategoryTitle and CategoryID from our src/custom-component/sidemenu/sidemenu.ts file.
    // The categoryTitle is for display purposes. The categoryID is for fetching posts
    // based on their CategoryID. Refer to src/custom-components/sidemenu/sidemenu.ts
    this.CategorySlug = this.navParams.get("categorySlug");
    this.CategoryName = this.navParams.get("categoryName");
    this.categoryPostData = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
    this.loadCategoryPosts();
  }

  // Function to load more posts using ion-infinite-scoll.
  doInfinite(infiniteScroll) {
    console.log('Begin infinite scrolling operation');
      // increase our page number which tells our wp-api to fetch posts
      // from next page. eg: www.domain.com/wp-json/wp/v2/posts?filter[taxonomy]=featured-video&page=2
      this.pageNumber = this.pageNumber + 1;
      this.jsonApiCall.load(this.config.get("apiUrl")+"/gettypewisemobile?termId="+this.CategorySlug+"&after="+this.dataAfter, false).subscribe(
        data => {
          // Successful Request
          console.log("category data",data[0]['data'].length);
          if(data[0]['data'].length > 0){
              for(let post of data[0]['data']){
                this.categoryPostData.push(post);
              }
              this.numberOfPostsInLoaded = Object.keys(this.categoryPostData).length;
              console.log(this.categoryPostData);

              if(data[0]['data'].length < 1)
              {
                // No more data was returned.
                // reduce our pageNumber back by 1, so next time we scroll down,
                // we don't skip a number
                this.pageNumber = this.pageNumber - 1;
              }
              if(data[0]['data'].length == 10){
                this.dataAfter = this.dataAfter + 10;
              }
              infiniteScroll.complete();
          }else{
            this.jsonApiCall.load(this.config.get("apiUrl")+"/gettermwisemobile?termId="+this.CategorySlug+"&after="+this.dataAfter, false).subscribe(
            data => {
              for(let post of data[0]){
                this.categoryPostData.push(post);
              }
              this.numberOfPostsInCategory = Object.keys(this.categoryPostData).length;
              console.log(this.categoryPostData);
              if(data[0].length == 10){
                this.dataAfter = this.dataAfter + 10;
              }

            },
            err => {
              this.pageNumber = this.pageNumber - 1;
              console.log(err);
            })
          }          
        },
        err => {
          // Failed Request
          // reduce our pageNumber back by 1, so next time we scroll down,
          // we don't skip a number
          this.pageNumber = this.pageNumber - 1;
          // For Debugging
          infiniteScroll.complete();
          console.log(err);
        }
      )

  }

  loadCategoryPosts(cache: boolean = false) {
    //A Local variable for configuring our loadingController
    let loader = this.loadingController.create({
      content: `<div class='app-spinner'></div>`
    });

    //Show Loader on screen
    loader.present();

    //Load the data using our http Service. Remember the cache parameter is either true/false
    this.jsonApiCall.load(this.config.get("apiUrl")+"/gettypewisemobile?termId="+this.CategorySlug+"&after="+this.dataAfter, cache).subscribe(
      data => {
          console.log("category data",data[0]['data'].length);
          if(data[0]['data'].length > 0){
              // Successful Request
              // this.categoryPostData = data[0];
              for(let post of data[0]['data']){
                this.categoryPostData.push(post);
              }
              if(data[0]['data'].length == 10){
                  this.dataAfter = this.dataAfter + 10;
              }
              this.numberOfPostsInCategory = data[0]['total_count'];
              this.numberOfPostsInLoaded = Object.keys(this.categoryPostData).length;
              this.didNotLoad = false;
              console.log(this.categoryPostData);
              // Remove Loader on screen
              loader.dismiss();

          }else{
            this.jsonApiCall.load(this.config.get("apiUrl")+"/gettermwisemobile?termId="+this.CategorySlug+"&after="+this.dataAfter, false).subscribe(
            data => {
              // Successful Request
              // this.categoryPostData = data[0];
              for(let post of data[0]){
                this.categoryPostData.push(post);
              }
              if(data[0].length == 10){
                  this.dataAfter = this.dataAfter + 10;
              }
              this.numberOfPostsInCategory = Object.keys(this.categoryPostData).length;
              this.didNotLoad = false;
              console.log(this.categoryPostData);
              // Remove Loader on screen
              loader.dismiss();


            },
            err => {
              this.pageNumber = this.pageNumber - 1;
              console.log(err);
            })
          }          

      },
      err => {
        // Failed Request
        this.didNotLoad = true;
        // Remove Loader on screen
        loader.dismiss();

        // For Debugging
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
