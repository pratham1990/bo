import { Component } from '@angular/core';
import { NavController, LoadingController, App } from 'ionic-angular';
import { Auth, User, IDetailedError, UserDetails} from '@ionic/cloud-angular';
import { IonicAuthHelper } from '../../providers/ionic-auth/ionic-auth-helper';


// Importing the forgot password page
import { TabForgotPage} from '../tab-forgot/tab-forgot';

// Importing the HomePage
import { HomePage } from '../home/home';

/*
  Generated class for the TabLogin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tab-login',
  templateUrl: 'tab-login.html'
})
export class TabLoginPage {
  // Create a variable and assign it to the TabForgotPage class
  forgotPage = TabForgotPage;
  newEmail : string;
  newPassword : string;

  // instansiate all our class variables with imported classes from ionic-angular
  constructor(
    public navCtrl: NavController,
    public auth : Auth,
    public user : User,
    public loadingController : LoadingController,
    public ionicAuthHelper : IonicAuthHelper,
    public app: App) {

    }

  // If the page comes into view write a console log of the page name.
  ionViewDidLoad() {
    console.log('Hello TabLoginPage Page');
    this.auth.logout();


    // console.log('testing local variable - set to []');
    // let variable = [];
    // variable['399'] = 'samsonite';
    // console.log(variable);
    // console.log('the 399th key of '+variable+'='+variable[399]);
  }

  // Function to create and dimiss a loading screen indicator
  // of a server background process
  Login() {
    // Setup LoadingController Config
    let loader = this.loadingController.create({
      content: `<div class='app-spinner'></div>`,
      dismissOnPageChange: true // prevents the loader from persisting in the next page
    });

    // Show Loading screen
    loader.present();

    // prep Email and Password
    let details : UserDetails = {
      'email' : this.newEmail,
      'password' : this.newPassword
    };

    // Begin Ionic Registration
    this.auth.login('basic', details).then(
      // Function to run if successful
      () => {
        console.log('user logged in!');
        loader.dismiss().catch(() => {});
        this.gotoHomePage();
      },

      // Function to run if not successful
      (err : IDetailedError<any>) => {
        loader.dismiss().catch(() => {});
        // console.log(err);
        this.ionicAuthHelper.showSimpleErrorToastMsg(err);
      }
    )

  }

  // Go to the Homepage. We're setting the root to the Home so we can't go back to the login
  gotoHomePage() {
    this.app.getRootNav().setRoot(HomePage, {}, {animate: true, direction: 'forward'});
  }

}
