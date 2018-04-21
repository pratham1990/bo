import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Config, ActionSheetController } from 'ionic-angular';
import { JsonApiCall } from '../../providers/json-api-call/json-api-call';

import { SocialSharing } from 'ionic-native';

/*
  Generated class for the PostDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-page-detail',
  templateUrl: 'page-detail.html',
  providers: [JsonApiCall]
})
export class PageDetailPage {

  // We need to define our properties that match the JSON, else we will get "undefined" errors
  // when using singlePostData.some-property in our template

  singlePostData : Object = {}

  // Post Id
  PostID : number;

  // Property for our Error Message. Set to False/true depending on request success/fail
  didNotLoad : boolean = false;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public jsonApiCall : JsonApiCall,
    public loadingController : LoadingController,
    public config : Config,
    public actionSheetController : ActionSheetController
  ) {
    // If we get to this page carrying a postID, It will be set here for use
      this.PostID = params.get("id");

      // Check if sharing via email is supported
      SocialSharing.canShareViaEmail().then(() => {
        // Sharing via email is possible
        console.log('Share via email available!')
      }).catch(() => {
        // Sharing via email is not possible
        console.warn('Share via email NOT available!')
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PageDetailPage');
    // We need an id to request all resources for a particular post.
    // if it doesn't exist, run an error and don't do anything further...
    if (this.PostID == null) {
      console.error("Post ID is null. Is the page before this one supplying the id? If its not this page will fail");
      this.didNotLoad = true;
    }

    // ... but if we do have an id, do run our functions
    else {
      this.loadPost(true);
      // this.loadRelatedPost();
      console.log("Post ID is: ",this.PostID);
    }
  }

  private loadPost(cache: boolean = false) {
      //A Local variable for configuring our loadingController
      let loader = this.loadingController.create({
        content: `<div class='app-spinner'></div>`
      });

      //Show Loader on screen
      loader.present();

      //Load the data using our http Service. Remember the cache parameter is either true/false
      this.jsonApiCall.load(this.config.get("apiUrl")+"/pages/"+this.PostID+'?_embed', cache).subscribe(
        data => {
          // Successful request
          this.singlePostData = data[0];

          this.didNotLoad = false
          console.log('Post Details: ', this.singlePostData);

          // Dismiss loader on screen
          loader.dismiss();
        },
        err => {
          // Request Failted
          this.didNotLoad = true;
          loader.dismiss();
          // For Debugging
          console.log(err);
        }
      )
  }

  shareOptionsAndShare(postTitle : string, postImage : string = null, postUrl : string) {
   let actionSheet = this.actionSheetController.create({
     title: 'Share this post',
     buttons: [
       {
         text: 'Facebook',
         handler: () => {
           console.log('Facebook clicked');
           SocialSharing.shareViaFacebook(postTitle, postImage, postUrl).then(
             () => {
               console.log('Success to Facebook');
             },
             () => {
               console.log('Failed!');
             }
           )
         }
       },
       {
         text: 'Twitter',
         handler: () => {
           console.log('Twitter clicked');
           SocialSharing.shareViaTwitter(postTitle, postImage, postUrl).then(
             () => {
               console.log('Success to Twitter');
             },
             () => {
               console.log('Failed!');
             }
           )
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
 }


}
