import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class IonicAuthHelper {
  userDetails : any;
  constructor(
    public toastController : ToastController
  ) {}


  setUserDetails(data){
    this.userDetails = 'Samsonite';
  }

  getUserDetails(){
    return this.userDetails;
  }


  // Slightly Styled Error toast message. Use this in addition to
  // your own authentication Module
  showRegistrationErrorToastMsg(err) {

    let errorMsg : string;

    for (let e of err.details) {
      if (e === 'conflict_email') {
        console.warn('email exists')
        errorMsg = "Email already Exists";
      }

      else if (e === 'required_email') {
        errorMsg = "Email Required";
      }

      else if (e === 'required_password') {
        errorMsg = "Password Required";
      }

      else if (e === 'conflict_username') {
        errorMsg = "Username taken";
      }

      else if (e === 'invalid_email') {
        errorMsg = "Invalid Email Format";
      }
    }


    // Create an instance of a toast message with configurations
    let toast = this.toastController.create({
      message: errorMsg,
      duration: 4000,
      position: 'top',
      cssClass: 'toast-message-error',
      showCloseButton : true
    })
    // Show the toast based on the settings above. Done
    toast.present();
  }

  showSimpleErrorToastMsg(err) {
    // Ionic Auth Returns 'Unsuccessful HTTP response' instead of
    // invalid email/password Combination. So we're checking for this response and
    // amending to our own message. Other error messages remain unaffected.
    if (err.message == 'Unsuccessful HTTP response'){
      // console.log('Error msg match!');
      err.message = 'Invalid email/password combination';
    }
    
    // Create an instance of a toast message with configurations
    let toast = this.toastController.create({
      message: err.message,
      duration: 4000,
      position: 'top',
      cssClass: 'toast-message-error',
      showCloseButton : true
    })
    // Show the toast based on the settings above. Done
    toast.present();
  }

  showSimpleToastMsg(message, position : string = 'top', cssClass : string = 'toast-message-success') {

    // Create an instance of a toast message with configurations
    let toast = this.toastController.create({
      message: message,
      duration: 4000,
      position: position,
      cssClass: cssClass,
      showCloseButton : true
    })
    // Show the toast based on the settings above. Done
    toast.present();
  }



}
