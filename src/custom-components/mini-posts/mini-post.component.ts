import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

// <!--Actual Html Usage of this component in your pages-->
// <div class="mini-post-section">
//   <h6 class="mini-post-section--title">related articles</h6>
//   <ion-list>
//      <mini-post>....</mini-post>
//   </ion-list>
// </div>
// <!--End Wrapping!-->

// For Styling, refer to sibling file mini-post.scss

@Component({
  selector: 'mini-post',
  template: `
  <ion-item (click)="onClick()">
    <ion-thumbnail item-left>
      <img src="{{miniPostImage}}">
    </ion-thumbnail>
    <h1 [innerHTML]="miniPostTitle"></h1>
  </ion-item>
  `
})



export class MiniPostComponent implements OnInit {
  @Input() miniPostImage : string = "build/assets/blank-default-mini-pic.png";
  @Input() miniPostTitle : string = "Default Post Title";
  @Input() miniPostID : number = 0;
  @Output() onPostClick = new EventEmitter;

  ngOnInit() {
    if (this.miniPostImage == ''){
      // if an image source isn't supplied (or is empty), use the default image
      // on initiation :D
      this.miniPostImage = 'assets/blank-default-feed-bg.png';
      // console.log('empty');
    }
  }

  // Make the PostID every <mini-post> is carrying accessible outside the component
  onClick() {
    console.log(this.miniPostID);
    this.onPostClick.emit({
      miniPostID : this.miniPostID
    });
  }
}
