import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'error-dialog',
  templateUrl: 'errorDialog.html'
})

// Usage Example:
// ---------------------------

// <error-dialog
//   [showError]="didNotLoad"
//   [FriendlyErrorMsg] = 'Your own error message'
//   (DialogButtonTap)="loadFeed(false)">
// </error-dialog>

// ---------------------------

export class ErrorDialogComponent {

  // Should this <error-dialog></error-dialog> be visible?
  // use [showError] = true/false
  @Input() showError : any = false;

  // If you need a different error message...
  // use [FriendlyErrorMsg] = 'Your own error message'
  @Input() FriendlyErrorMsg : string = "Data didn't load. Try again";

  // Output Function when the reload button is tapped
  // Best used to initiate the loading process again
  // use (DialogButtonTap)="YourFunctionInParentClass.ts()"
  @Output() DialogButtonTap = new EventEmitter;

  constructor() {
  }

  onClickButton() {
    this.DialogButtonTap.emit({

    })
  }

}
