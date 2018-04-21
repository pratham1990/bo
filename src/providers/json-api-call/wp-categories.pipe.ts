import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name : 'WpCategoryIdToName'
})

export class WpCategoryPipe implements PipeTransform {
  transform(value : any, args : any[]) {
    // return categoryArray[0];
    if (args === undefined) {
      return ''
    }
    else {
      // console.log(args[value]);
      return args[value]
    }
  }
}
