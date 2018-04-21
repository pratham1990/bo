import { Injectable } from '@angular/core';
import { JsonApiCall } from './json-api-call';
import { Config } from 'ionic-angular';

@Injectable()
export class WpCategoryAndPages {
  Categories : any;
  CategoryFilter : any;
  Pages : any;
  constructor(
    public jsonApiCall : JsonApiCall,
    public config : Config
  ){
    this.loadCategories();
    this.loadPages();
    this.prepCategoryFilter();

  }


  public loadCategories(){
    console.log('called global wp-cat-page-service');
    this.Categories = this.jsonApiCall.load(this.config.get("apiUrl")+"/categories", false)
  }
  public loadPages() {
    this.Pages = this.jsonApiCall.load(this.config.get("apiUrl")+"/pages", false)
  }

  public prepCategoryFilter() {
    this.Categories.subscribe(
      data => {
        let catData = data[0];
        let categoryListObject = {};
        catData.forEach(function(item){
          categoryListObject[item.id] = item.name;
        });
        // console.log('fine tuned: ', categoryListObject);
        this.CategoryFilter = categoryListObject;
      }
    )
  }
}
