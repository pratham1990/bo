import { Component } from '@angular/core';
import { Config, NavController } from 'ionic-angular';
import { Auth, User} from '@ionic/cloud-angular';
import { JsonApiCall } from '../../providers/json-api-call/json-api-call';
import { IonicAuthHelper } from '../../providers/ionic-auth/ionic-auth-helper';
import { CategoryPage } from '../../pages/category/category';
import { PageDetailPage } from '../../pages/page-detail/page-detail';
import { BookmarksPage } from '../../pages/bookmarks/bookmarks';
import { LoginPage } from '../../pages/login/login';
import { WpCategoryAndPages } from '../../providers/json-api-call/wp-categories-and-pages';
import { IonicAuthBookmarks } from '../../providers/ionic-auth/ionic-auth-bookmarks';

@Component({
  selector: 'mg-wp-sidemenu',
  templateUrl : 'sidemenu.html'
})

export class SideMenuComponent {
  // menu Object
  categoryMenu : any;
  pageMenu: any;
  categoryPage : any;

  loginPage : any;

  bookmarks : any;

  userIsAuthenticated : boolean;

  // User Profile
  Username : string ;
  ProfileImage : string ;

  numberOfBookmarks : number = 0;

  pages: Array<{title: string, component: any}>;

  constructor(
    public jsonApiCall : JsonApiCall,
    public config : Config,
    public user : User,
    public nav : NavController,
    public auth : Auth,
    public ionicAuthHelper : IonicAuthHelper,
    public ionicAuthBookmarks : IonicAuthBookmarks,
    public wpCategoryAndPages : WpCategoryAndPages
  ) {
      this.loginPage = LoginPage;
      this.userIsAuthenticated = this.auth.isAuthenticated();

      // Fetch the number of already existing bookmarks.
      // return null if no results
      let userBookmarks = this.user.get('bookmarks', null);

      if(userBookmarks !== null) {
        // lets get the current number of bookmarks
        this.numberOfBookmarks = userBookmarks.length;
        // console.log(userBookmarks.length);

        // then subscribe for updates in the event the bookmarks change
        this.ionicAuthBookmarks.bookmarkData.subscribe(
          (data) => {
            // console.log('bookmark observable data: ', data);
            if(data.length > 0){
              // update with the new number of bookmarks
              this.numberOfBookmarks = data.length;
            }
            else {
              // set explictly to zero so when the last bookmark is removed it
              // updates in the sidemenu view
              this.numberOfBookmarks = 0;
            }
          }
        )
      }

      this.bookmarks = BookmarksPage;

      //this.getPages();
      this.getCategories();

      //this.Username = this.user.details.email;
      //this.ProfileImage = this.user.details.image;

      this.setDefaultUserDetails();

      // Debugging
      //console.log('Username: ', this.Username);

  }

  ionViewDidLoad() {
     this.categoryMenu = this.wpCategoryAndPages.loadCategories(); // this.getCategories();
     console.log(" category data ----",this.categoryMenu);
  }

  public setDefaultUserDetails() {
    // Set defaults for Username and ProfileImage
    if(!this.Username) {
      this.Username = 'Stranger';
    }
    if(!this.ProfileImage) {
      this.ProfileImage= 'assets/profile-pic-blank.png';
    }
  }

  private getCategories() {
    this.wpCategoryAndPages.Categories.subscribe(
      data => {
        this.categoryMenu = data[0];
      },
      err => {
        console.log(err);
      }
    )
  }

/*  
  private getPages() {
    this.wpCategoryAndPages.Pages.subscribe(
      data => {
        this.pageMenu = data[0];
      },
      err => {
        console.log(err);
      }
    )
  }
*/

  gotoCategory(categorySlug: number,categoryName: string) {
    // Navigate to the CategoryPage with the catergorySlug
    console.log('category Slug: ', categorySlug,categoryName);
    this.nav.push(CategoryPage, {
      categorySlug : categorySlug,
      categoryName : categoryName
    });
  }

  // Method navigation to PostDetailPage with Post ID
  gotoDetailPage(pageID : number) {
    this.nav.push(PageDetailPage, {
      id: pageID
    })
  }

  gotoLoginPage(){
    this.nav.push(LoginPage);
  }

  logMeOut() {
    console.log('user status is currently: ', this.auth.isAuthenticated())
    this.auth.logout();
    console.log('user status is now: ', this.auth.isAuthenticated())
    console.log('user details after logout: Username: ', this.user.details.username, 'Profile: ', this.user.details.image);
    this.Username = 'Stranger';
    this.ProfileImage= 'assets/profile-pic-blank.png';
    this.ionicAuthHelper.showSimpleToastMsg('You are now logged out');
  }

}
