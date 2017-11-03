import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({name: 'values', pure: false})
export class ValuesPipe implements PipeTransform {
  transform(value: any, arg1: string, arg2: boolean): Object[] {
    const keyArr: any = Object.keys(value);
    const dataArr: any[] = [];
    const keyName: any = arg1;

    keyArr.forEach((key: string) => {
      value[key][keyName] = key;
      dataArr.push(value[key]);
    });
    if (arg2) {
      dataArr.sort((a , b): number => {
        return a[keyName] > b[keyName] ? 1 : -1;
      });
    }
    return dataArr;
  }
}

