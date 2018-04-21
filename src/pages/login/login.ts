import { Component } from '@angular/core';
import { NavController, MenuController} from 'ionic-angular';

// Pages we want to make sub tabs of
import { TabLoginPage } from '../tab-login/tab-login';
import { TabSignupPage } from '../tab-signup/tab-signup';


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

// This page will house our tabs. Any sub tab of this page is
// named with prefix a prefix of "tab-" in the folder and files
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // Create two variables for use in our login.html <ion-tab [root]>...</ion-tab>
  tab1 : any;
  tab2:  any;
  constructor(public navCtrl: NavController, menu: MenuController) {
    // assign our just created variables with the classes of the pages we want to use,
    // namely TabLoginPage and TabSignupPage
    this.tab1 = TabLoginPage;
    this.tab2 = TabSignupPage;

    // Disable the sidebarMenu in the login page (We'll re-enable it in pages/home.ts)
    menu.enable(false, 'sidebarMenu');
  }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

}
