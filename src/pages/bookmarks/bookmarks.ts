import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth, User} from '@ionic/cloud-angular';
import { IonicAuthBookmarks } from '../../providers/ionic-auth/ionic-auth-bookmarks';
import { PostDetailPage } from '../post-detail/post-detail';
import { LoginPage } from '../login/login';

/*
  Generated class for the Bookmarks page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bookmarks',
  templateUrl: 'bookmarks.html'
})
export class BookmarksPage {

  loginPage : any;

  // Our Data Object Structure for our list of bookmarks. The ending "[]"
  // denotes this as an array of objects
  bookmarks : {
    id: number,
    slug: string,
    url: string,
    imageUrl: string
  }[];

  counter : number = 0;

  isLoggedIn : boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth : Auth,
    public user : User,
    public ionicAuthBookmarks : IonicAuthBookmarks
  ) {
    this.loginPage = LoginPage;
  }

  ionViewDidLoad() {
    if (this.getAuthStatus()) {
      this.isLoggedIn = true;
      this.getBookmarks();
    }
    else {
      this.isLoggedIn = false;
    }

    if(!this.bookmarks) {
      console.log('Bookmark initially not defined');
    }

    // unset existing bookmarks
    // this.user.unset('bookmarks');
    // this.user.save();

    // console.log('ionViewDidLoad BookmarksPage');
  }

  // Check if logged in
  getAuthStatus() {
    if (this.auth.isAuthenticated()) {
      console.log('this.user is authenticated!');
      return true;
    }
    else {
      console.log('Not authenticated');
      return false;
    }
  }

  // retreive list of bookmarks
  getBookmarks() {
    this.bookmarks = this.ionicAuthBookmarks.getBookmarks();
    console.log(this.bookmarks);
  }

  removeBookmarks(id) {
    // console.log('array id: ', id);
    this.ionicAuthBookmarks.deleteBookmark(id);
  }

  // Method navigation to PostDetailPage with Post ID
  gotoDetailPost(id) {
    this.navCtrl.push(PostDetailPage, {
      id: id
    })
  }



}
