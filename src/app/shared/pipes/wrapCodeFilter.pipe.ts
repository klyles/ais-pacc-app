import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  public transform(value, key: string, term: string) {

    console.log(value, key, term)

    if (!term) return value;
    // should have been closer to this...
    // return (value || []).filter((item) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));

    // ... but hard coded because my brain hurts (why does the data look like that? no idea)
    return (value || []).filter((item) => new RegExp(term, 'gi').test(item['configurationId'][key]));

  }
}
