import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Config, ActionSheetController } from 'ionic-angular';
import { JsonApiCall } from '../../providers/json-api-call/json-api-call';
import { IonicAuthBookmarks } from '../../providers/ionic-auth/ionic-auth-bookmarks';
import { IonicAuthHelper } from '../../providers/ionic-auth/ionic-auth-helper';
import { Auth } from '@ionic/cloud-angular';

import { SocialSharing } from 'ionic-native';

/*
  Generated class for the PostDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-post-detail',
  templateUrl: 'post-detail.html',
  providers: [JsonApiCall]
})
export class PostDetailPage {

  // Our All-data holding object
  singlePostData : Object = {}

  // Post Id
  PostID : number;

  // Property for our Error Message. Set to False/true depending on request success/fail
  didNotLoad : boolean = false;

  // Our variable for it the post is bookmarked already
  isBookmarked : boolean = false;

  isAuthenticated : boolean;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public jsonApiCall : JsonApiCall,
    public loadingController : LoadingController,
    public config : Config,
    public actionSheetController : ActionSheetController,
    public ionicAuthBookmarks : IonicAuthBookmarks,
    public ionicAuthHelper : IonicAuthHelper,
    public auth : Auth
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

      //check if this post has already been bookmarked
      this.checkIfPostIsBookmarked();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostDetailPage');

    this.isAuthenticated = this.auth.isAuthenticated();

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

  checkIfPostIsBookmarked(){
    // this.isBookmarked = false;
    this.isBookmarked = this.ionicAuthBookmarks.ifBookmarkExists(this.PostID);
    // console.log('is post already bookmarked? : ', status);
  }

  // Save Bookmark Function
  public saveBookmark($event){
    // for debugging
    // console.log($event);

    // assign our event data to our local variable
    let entry = {
      id : $event.postID,
      slug : $event.postTitle,
      url : $event.postUrl,
      imageUrl : $event.postImgUrl
    }

    console.log('emitted bookmark value',$event.isBookmarked)

    // here we are checking if the page is already bookmarked, based on the emitted
    // value from our <bookmark isClicked="boolean value"></bookmark>
    if(!$event.isBookmarked) {
      //If already bookmarked (True), remove it
      this.ionicAuthBookmarks.deleteBookmark($event.postID);
      this.ionicAuthHelper.showSimpleToastMsg('Bookmark removed', 'bottom', 'toast-message-warning');

      // update our this.isBookmarked so our <bookmark> component will update itself
      // this.isBookmarked = !this.isBookmarked;
    }
    else {
      console.log('so far: ', entry);
      // Process the bookmark. this.ionicAuthBookmarks.addBookmark(entry) returns
      // either true/false
      if(this.ionicAuthBookmarks.addBookmark(entry)){
        // console.log('Success! Bookmark Saved');
        //Run a toast saying our bookmark was saved.
        this.ionicAuthHelper.showSimpleToastMsg('Success! Bookmark Saved', 'bottom');

        // update our this.isBookmarked so our <bookmark> component will update itself
      }
      else {
        // console.log("Nope, didn't work");
        //Run a toast saying our bookmark save failed
        this.ionicAuthHelper.showSimpleToastMsg('Sorry, but you bookmark was not saved', 'bottom', 'toast-message-error');
      }
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
      this.jsonApiCall.load(this.config.get("apiUrl")+"/getNodeDataMobile?nid="+this.PostID, cache).subscribe(
        data => {
          // Successful request
          console.log("all data ------",data);

          data[0]['videoCover'] = data[0]['videoCover'].replace("watch?v=", "v/");
          data[0]['videoCover'] = data[0]['videoCover'].replace("www.youtube.com/v/", "www.youtube.com/embed/");
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
    SocialSharing.share(postTitle, postImage, postUrl).then(
      () => {
        console.log('Success to Share');
      },
      () => {
        console.log('Failed!');
      }
    );
   /*let actionSheet = this.actionSheetController.create({
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

   actionSheet.present();*/
 }


}
