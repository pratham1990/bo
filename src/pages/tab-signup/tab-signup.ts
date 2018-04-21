import { Component } from '@angular/core';
import { NavController, LoadingController, App} from 'ionic-angular';
import { Auth, User, IDetailedError, UserDetails} from '@ionic/cloud-angular';
import { IonicAuthHelper } from '../../providers/ionic-auth/ionic-auth-helper';
import { HomePage } from '../home/home';

/*
  Generated class for the TabSignup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tab-signup',
  templateUrl: 'tab-signup.html'
})
export class TabSignupPage {
  newEmail : string;
  newPassword : string;
  homePage : any;
  constructor(
    public navCtrl: NavController,
    public auth : Auth,
    public user : User,
    public app : App,
    public loadingController : LoadingController,
    public ionicAuthHelper : IonicAuthHelper
  ) {
      this.homePage = HomePage;
    }

  ionViewDidLoad() {
    console.log('Hello TabSignupPage Page');
  }

  SignUp(email : string, password : string) {

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
    this.auth.signup(details).then(
      // Function to run if successful
      () => {
        console.log('user registered');

        // Since we're successful, let login the user immediately with said details
        this.auth.login('basic', details).then(
          // ..and only on successful login will we toast a message
          // and transition to the Home screen
          ()=>{
            this.ionicAuthHelper.showSimpleToastMsg("Great, you're signed up!");
            this.app.getRootNav().setRoot(HomePage, {}, {animate: true, direction: 'forward'});
          }
        )
      },

      // Function to run if not successful
      (err : IDetailedError<string[]>) => {
        loader.dismiss();
        this.ionicAuthHelper.showRegistrationErrorToastMsg(err);
      }
    )


  }

}
