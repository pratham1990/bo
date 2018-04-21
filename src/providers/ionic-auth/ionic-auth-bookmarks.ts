import { Injectable } from '@angular/core';
import { User } from '@ionic/cloud-angular';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IonicAuthBookmarks {
  bookmarks : any;
  bookmarkData : any;
  bookmarksObserver : any;
  constructor(
    public user : User
  ){
    //creating an observable so we can continously listen for changes
    this.bookmarkData = Observable.create(observer => {
      this.bookmarksObserver = observer;
    })

    // lets get our Bookmarks first
    // this.getBookmarks();
  }

  getBookmarks() {
    // get our bookmarks from Ionic Auth custom data. Return null if none exist
    this.bookmarks = this.user.get('bookmarks', null);
    console.log('listed bookmarks', this.bookmarks);
    return this.bookmarks;
  }

  // add a bookmark
  addBookmark(
    entry = {
      id : <number> 0,
      slug : <string> null,
      url : <string> null,
      imageUrl : <string> null
    }) {

    if(!this.bookmarks) {
      this.bookmarks = [entry];
    }
    else {
      this.bookmarks.push(entry);
    }
    this.user.set('bookmarks', this.bookmarks);
    console.log('updated bookmarks: ', this.bookmarks);
    this.user.save();
    // push current bookmark list as an observable update.
    this.bookmarksObserver.next(this.bookmarks);
    return true;
  }

  public deleteBookmark(id){
    //set local variable arrayIndex = 0
    let arrayIndex = 0;

    // Debugging
    // console.log('searching for id of: ', id);

    // Loop through the array. See if our array entries contain the id
    for(let i = this.bookmarks.length - 1; i--;){
      // if so set arrayIndex = loop index
      if(this.bookmarks[i].id = id){
        // console.log('found!');
        arrayIndex = i;
        break; // we end search through the loop, else we'll end with 2 results instead of 1
      }
    }

    //splice array using arrayIndex
    this.bookmarks.splice(arrayIndex, 1);

    // update user bookmarks
    this.user.set('bookmarks', this.bookmarks);

    // save changes to ionic auth
    this.user.save();

    // push current bookmark list as an observable update.
    this.bookmarksObserver.next(this.bookmarks);

  }

  // Check if our postID is already save in our custom data
  public ifBookmarkExists(id) {

    // get our bookmarks first
    this.bookmarks = this.getBookmarks();

    // set our local variable that we will return at end of function
    let alreadyExists : boolean = false;

    if (this.bookmarks) {
      // loop through the bookmarks and see if the id supplied already exists
      for(let record of this.bookmarks) {
        if(id == record.id) {
          alreadyExists = true;
        }
      }
    }

    // return our true/false status
    return alreadyExists;

  }
}
