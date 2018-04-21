import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { Auth} from '@ionic/cloud-angular';
import { IonicAuthHelper } from '../../providers/ionic-auth/ionic-auth-helper';
import { LoginPage } from '../login/login';
/*
  Generated class for the ResetPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {
  newPassword : string;
  confirmedNewPassword : string;
  passcode : number;
  loginPage : any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth : Auth,
    public ionicAuthHelper : IonicAuthHelper,
    public app : App
  ) {
    this.loginPage = LoginPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  resetPassword() {
    if (this.newPassword == this.confirmedNewPassword && this.newPassword && this.confirmedNewPassword){
      console.log('they both match!');
      if(this.isInt(this.passcode)){
        console.log('passcode is numerical');

        // run our password reset function
        this.auth.confirmPasswordReset(this.passcode, this.newPassword).then(
          // Reset was successful!
          () => {
            // Run a toast saying the password has reset
            this.ionicAuthHelper.showSimpleToastMsg("Password has been reset! Taking you to the login...", 'top', 'toast-message-success');
            setTimeout(()=>{
              // Delay by 2000 ms and transition to our loginPage. we're using setRoot() so the user
              // can't go back to this page again.
              this.app.getRootNav().setRoot(this.loginPage, {}, {animate: true, direction: 'forward'});
            }, 2000);
          },

          // Reset wasn't successful
          Error => {
            console.log('Error, did not work: ', Error);
            // Run a toast stating the error
            this.ionicAuthHelper.showSimpleToastMsg(Error, 'top', 'toast-message-error');
          }
        );
      }
      else {
        console.log('passcode not valid numerical');

        // Run a toast saying Passcode isn't numeric
        this.ionicAuthHelper.showSimpleToastMsg("Passcode not numeric", 'top', 'toast-message-error');
      }
    }
    else {
      this.ionicAuthHelper.showSimpleToastMsg("New Password and Confirmed Password must match and not empty", 'top', 'toast-message-error');
    }
  }

  isInt(value) {
    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
  }

}
