import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

/*
  Generated class for the Bookmark component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'bookmark',
  template: `
  <button ion-button clear color="light" outline (click)="onClick()">
    <ion-icon *ngIf="isClicked" ios="ios-bookmark" md="ios-bookmark"></ion-icon>
    <ion-icon *ngIf="!isClicked" ios="ios-bookmark-outline" md="ios-bookmark-outline"></ion-icon>
  </button>`
})
export class BookmarkComponent implements OnInit{
  @Input() isClicked : boolean = false;
  @Input() bookmarkStatus : string = 'ios-bookmark-outline';
  @Output() onBookmarkClick = new EventEmitter();

  // Data aspects
  @Input() postID : number = 0;
  @Input() title : string = '';
  @Input() url : string = '';
  @Input() imgUrl : string = '';

  constructor() {

  }

  ngOnInit() {

  }


  onClick() {
    console.log('Before click, isClicked was: ', this.isClicked);
    this.isClicked = !this.isClicked;
    console.log('After click, isClicked is', this.isClicked);
    // console.log(this.postID, this.title, this.url, this.imgUrl);
    this.onBookmarkClick.emit({
      postID : this.postID,
      postTitle : this.title,
      postUrl : this.url,
      postImgUrl : this.imgUrl,
      isBookmarked : this.isClicked
    });
  }
}
