import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '@ionic/cloud-angular';
import { IonicAuthHelper } from '../../providers/ionic-auth/ionic-auth-helper'
import { ResetPasswordPage } from '../reset-password/reset-password';

/*
  Generated class for the TabForgot page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tab-forgot',
  templateUrl: 'tab-forgot.html'
})
export class TabForgotPage {
  emailAddress : string;
  resetPasswordPage : any;
  constructor(
    public navCtrl: NavController,
    public auth : Auth,
    public ionicAuthHelper : IonicAuthHelper,
    public loadingController : LoadingController
  ) {
      this.resetPasswordPage = ResetPasswordPage;
  }

  ionViewDidLoad() {
    console.log('Hello TabForgotPage Page');
  }

  public requestPasswordReset()
  {
    // Setup LoadingController Config
    let loader = this.loadingController.create({
      content: `<div class='app-spinner'></div>`,
      dismissOnPageChange: true // prevents the loader from persisting in the next page
    });

    // Show Loading screen
    loader.present();

    // Request password reset using ionic auth
    this.auth.requestPasswordReset(this.emailAddress).then(
      () => {
        // Dismiss the loader
        loader.dismiss();

        // Show a toast saying they'll get an email
        // this.ionicAuthHelper.showSimpleToastMsg("You will get an email with reset instructions");
        this.navCtrl.push(this.resetPasswordPage);
      },
      Error => {
        this.ionicAuthHelper.showSimpleToastMsg("Something's not right. Please try again", 'top', 'toast-message-error');
      }
    );



  }

}
